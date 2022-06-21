# samfind-backend

Proyecto realizado con `nodejs` y `express`.

## ¿Cómo levantar el proyecto?
- Contar con version `18.1.0` de `nodejs`
- Ejecutar comando `npm i` para instalar dependencias.
- Para levantar el proyecto se ejecuta `npm run nodemon`

## A tener en cuenta
- Al levantar el servicio se deben modificar las rutas para que sean coherentes con el servicio levantado

## Carpeta test
En la carpeta `test` hay un script en python para hacer pruebas a la api. Este script consiste en tomar una imagen dentro de la misma carpeta, pasarla a `base64` y realizar un request a la api con el formato de entrada detallado mas adelante.  
Para hacer las pruebas solo se deben editar manualmente dos secciones del script:
- `RUTA`: Se debe modificar la ruta de la imagen a usar. Esta ira variando segun la imagen que se quiera testear.
- `ENDPOINT`: Se debe descomentar el endpoint a testear y comentar los otros. Estan en el mismo orden de la documentacion.

## Documentación de la API
- Rutas (reemplazar host por el host del servicio levantado o en su defecto, localhost:3001)
  - `host/api/dogorcat`
    - Esta ruta recibe una imagen y entrega el porcentaje de similitud con gato y perro
        ```json
        // JSON de Entrada (request)
        // image: Imagen en base64, limpiando del string el texto similar a: "data:image/png;base64,"
        // name: Nombre de la imagen sin formato
        // format: Formato de la imagen
        {
            "image": "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYA...",
            "name": "imagen1",
            "format": "png"
        }
        ```
        ```json
        // JSON de Salida (response)
        // Gato: Porcentaje de similitud con un gato
        // Perro: Porcentaje de similitud con un gato
        {
            "Gato": 0.0044444,
            "Perro": 0.9955556
        }
        ```
  - `host/api/dogbreed`
    - Esta ruta recibe una imagen y entrega el porcentaje de similitud con 5 razas de perro (las 5 mayores)
        ```json
        // JSON de Entrada (request)
        // image: Imagen en base64, limpiando del string el texto similar a: "data:image/png;base64,"
        // name: Nombre de la imagen sin formato
        // format: Formato de la imagen
        {
            "image": "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYA...",
            "name": "imagen1",
            "format": "png"
        }
        ```
        ```json
        // JSON de Salida (response)
        // raza: Porcentaje de similitud con esa raza en especifico
        // -> Se encuentran en orden decreciente
        {
            "raza1": 0.920,
            "raza2": 0.040,
            "raza3": 0.017,
            "raza4": 0.013,
            "raza5": 0.010
        }
        ```
  - `host/api/catbreed`
    - Esta ruta recibe una imagen y entrega el porcentaje de similitud con 5 razas de gato (las 5 mayores)
        ```json
        // JSON de Entrada (request)
        // image: Imagen en base64, limpiando del string el texto similar a: "data:image/png;base64,"
        // name: Nombre de la imagen sin formato
        // format: Formato de la imagen
        {
            "image": "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYA...",
            "name": "imagen1",
            "format": "png"
        }
        ```
        ```json
        // JSON de Salida (response)
        // raza: Porcentaje de similitud con esa raza en especifico
        // -> Se encuentran en orden decreciente
        {
            "raza1": 0.920,
            "raza2": 0.040,
            "raza3": 0.017,
            "raza4": 0.013,
            "raza5": 0.010
        }
        ```
  - `host/api/alldogcat`
    - Esta ruta recibe una imagen y entrega el tipo de animal y el porcentaje de similitud con 5 razas según el tipo de mascota (las 5 mayores)
        ```json
        // JSON de Entrada (request)
        // image: Imagen en base64, limpiando del string el texto similar a: "data:image/png;base64,"
        // name: Nombre de la imagen sin formato
        // format: Formato de la imagen
        {
            "image": "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYA...",
            "name": "imagen1",
            "format": "png"
        }
        ```
        ```json
        // JSON de Salida (response)
        // state: booleano
        //        -> 0: No encontró una raza que cumpla con al menos un 70% de similitud
        //        -> 1: Encontró una raza que cumple con al menos un 70% de similitud
        // animal: string
        //        -> Perro: En caso de que la foto corresponda a un perro
        //        -> Gato: En caso de que la foto corresponda a un gato
        // raza: Contiene un objeto con el porcentaje de las 5 razas mas presentes en el animal, en orden decreciente
        {
            "state": 1,
            "animal": "Perro",
            "raza": {
                "raza1": 0.920,
                "raza2": 0.040,
                "raza3": 0.017,
                "raza4": 0.013,
                "raza5": 0.010
            }
        }
        ```