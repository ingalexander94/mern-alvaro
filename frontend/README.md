# mern_semilla_auth
***

## Acerca del proyecto

Proyecto base frontend para el stack de tecnologías MERN (Mongo, Express, ReactJS y NodeJS), provee React versión 18.2.0 y NodeJS versión 16.7.0

El ejemplo implementa un módulo de autenticación, intercambiar entre el modo claro/oscuro y protección de rutas.

***

## Notas Importantes:

>---El ambiente incluye varias dependencias muy usadas en el archivo package.json, usted debe revisar las dependencias y sus respectivas versiones de acuerdo a las necesidades del proyecto.
>---El puerto usado en el docker-compose.yml es el 3000 para React, verifique que este puerto no este ocupado y si es el caso cámbielo por otro que este libre.

**A continuación se indica cómo correr el ambiente y cómo crear la BD para que el contenedor de Node pueda conectarse a Mongo.**

## Configurar VHOST en entorno local
Si ya realizo este paso antes puede omitirlo

~~~ 
sudo nano /etc/hosts
127.0.0.1    docker-auth-bengali.com
~~~ 

## Correr ambiente
```
docker-compose up -d --build
```

## Instalación de dependencias
Si se desea instalar una nueva dependencia, se debe ejecutar el siguiente comando, ajustando name-dependence por el nombre de la libreria que se desea instalar
docker run -it --rm -v $PWD/src:/app -w /app node:16.7.0-alpine3.14 npm install name-dependence