FROM python:3
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt 
COPY ./entrypoint.sh /script/
COPY ./dbobackend/src .
RUN chmod 775 /script/*
ENTRYPOINT ["/script/entrypoint.sh","--"]
CMD ["python","manage.py","runserver", "0.0.0.0:80"] 
