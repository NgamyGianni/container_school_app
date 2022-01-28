# Mode d'emploi

## Création des images
Afin de créer les 2 images, nous avons utilisé ces 2 Dockerfiles :
### Dockerfile du frontEnd
  FROM node:17-alpine AS builder  
  WORKDIR /usr/src/app  
  COPY . .  
  RUN npm install &&\  
  npm run build  
  FROM nginx:alpine  
  COPY --from=builder /usr/src/app/dist/backoffice /usr/share/nginx/html  

### Dockerfile du backEnd
  FROM python:slim-buster 
  WORKDIR /usr/src/app  
  COPY requirements.txt ./  
  RUN pip install --no-cache-dir -r requirements.txt  
  COPY ./entrypoint.sh /script/  
  COPY ./dbobackend/src .  
  RUN chmod 775 /script/*  
  ENTRYPOINT ["/script/entrypoint.sh","--"]  
  CMD ["python","manage.py","runserver", "0.0.0.0:80"]   
  
  ### entreypoint.sh du backEnd
  #!/bin/bash
  
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --)
          shift
          launch=("$@")
          break
          ;;
      *)
          echo "Unknown argument: $1"
          exit 1
          ;;
    esac
  done
  cd /usr/src/app
  echo -e "### Préparation du conteneur ###"
  sqlite=/usr/src/mydatabase/db.sqlite3
  if [ ! -f $sqlite ]; then 
    echo "create de la database"
    python manage.py makemigrations 
    python manage.py migrate 
    python manage.py initializedb
  fi
  echo -e "### Démarrage du conteneur ###"
  exec "${launch[@]}"

## Charger les images
Pour charger les 2 images, utiliser cette commande pour les 2 fichiers tar : docker image load < 'NomDeVotreFichier'.tar

## Créer le volume
Notre configuration intègre un volume, pour le créer, utiliser : docker volume create mydatabase

## Configuration et création des conteneurs
Pour finir, il faut configurer et créer les conteneurs des 2 images grâce au docker-compose.yml en utilisant la commande : docker-compose up -d  --build

## Utilisation
Maintenant que vous avez créer les 2 conteneurs de l'application, vous pouvez utiliser un navigateur en localhost au port 8080 pour le frontEnd et 8000 pour le backEnd, donc les urls respectifs : localhost:8080 et localhost:8000.
