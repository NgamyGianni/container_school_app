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