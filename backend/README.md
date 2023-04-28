# mern_semilla_auth
***

## Acerca del proyecto

Proyecto base backend para el stack de tecnologías MERN (Mongo, Express, ReactJS y NodeJS), provee Mongo versión 6.0.1 y NodeJS versión 16.7.0

El ejemplo implementa un módulo de autenticación con las funcionalidades de crear cuenta, verificar cuenta, iniciar sesión y recuperar contraseña, además se añade integración con amazon S3 para administrar archivos.

***

## Notas Importantes:

>---El ambiente incluye varias dependencias muy usadas en el archivo package.json, usted debe revisar las dependencias y sus respectivas versiones de acuerdo a las necesidades del proyecto.
>---El ambiente incluye un código de ejemplo que levanta un servidor web usando Express y lo conecta a una BD de Mongo y un frontend realizado en React.
>---Los puertos usados en el docker-compose.yml son el 8008 y el 27017 para Node y Mongo respectivamente, verifique que estos puertos no estén ocupados y si es el caso cámbielos por otros que estén libres.

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

## Crear BD y agregar usuario administrador
**Para esto es necesario ingresar a la terminal del contenedor de Mongo:**
Puede ingresar mediante Docker Desktop o desde la terminal con el siguiente comando:

```
docker exec -it database bash
```

**Una vez dentro de la terminal del contenedor de Mongo realizamos los siguientes pasos:**

```
#Acceder a mongo como usuario admin
mongosh -u "root" -p "bengali" 127.0.0.1

#Crear BD de ejemplo
use auth

#Insertar datos de ejemplo para que la creación de la BD se haga efectiva, en este caso crearemos los roles de la aplicación
db.roles.insertMany( [{ "name": "Admin", "state": 1 }, { "name": "Client", "state" : 1 }] )

#Agregamos usuario con permisos a la BD que creamos
db.createUser(
  {
    user: "root",
    pwd: "bengali",   
    roles:
      [
        { role: "dbOwner", db: "auth" }
      ]
  }
)
```

## Corremos el ambiente nuevamente
Al correr el ambiente nuevamente el contenedor de Node debería conectarse a Mongo sin problemas, ya que los cambios realizados en Mongo quedan guardados en el volume `mongo_data`
```
docker-compose up -d --build
```

## Configuración de entorno de desarrollo y producción
Para intercambiar entre el entorno de desarrollo y producción se debe ajustar la variable de entorno en la linea 10 del docker-compose.yml NODE_ENV: develop si se desea trabajar en modo desarrollo y NODE_ENV: production si se desea crear la imagen para producción.

## Instalación de dependencias
Si se desea instalar una nueva dependencia, se debe ejecutar el siguiente comando, ajustando name-dependence por el nombre de la libreria que se desea instalar
docker run -it --rm -v $PWD/src:/app -w /app node:16.7.0-alpine3.14 npm install name-dependence