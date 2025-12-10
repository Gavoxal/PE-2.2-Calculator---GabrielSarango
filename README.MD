# Actividad en clase - Calculator

## 1. Instalación de dependencias
Para instalar las dependencias necesarias, ejecutar el siguiente comando en la terminal:

```
npm install
```

comandos usados: 
npm init -y
npm install fastify
npm install -D typescript @types/node ts-node nodemon 
npx tsc --init
npm install @fastify/swagger 
npm install @fastify/swagger-ui

## Estructura del proyecto

PE 2.2 CALCULATOR/
├── node_modules/        
├── src/
│   ├── routes/           
│   │   ├── calculator.routes.ts  
│   │   └── index.ts              
│   └── tools/            
│       └── calculator.tools.json 
├── package.json          
└── tsconfig.json

## 2. creamos la carpeta src, y dentro de ella la carpeta routes

## 3. Creamos el archivo index.ts dentro de la carpeta src
[IMAGEN de captura 1](Capturas/captura1.png)

aqui estaran el codigo que se va a usar para el servidor, y para la ruta. 

## 4. Creamos el archivo calculator.routes.ts dentro de la carpeta src/routes

aqui estaran los codigos que se va a usar para la ruta. en el estaran la logica de lo que vamos a hacer, en este caso la calculadora, toda su logica estara en esta ruta. Tambien estara el codigo para el schema que se usara para validar los datos que se enviaran a la ruta. y el fastify.post que se usara para enviar los datos a la ruta.

[IMAGEN de captura 2](Capturas/captura2.png)

## 5. Probamos el servidor usando thunder. 

aqui validamos que todo funciona correctamente. y que se nos devuelve una respuesta correcta.

[IMAGEN de captura 3](Capturas/captura4.png)

debemos hacer comprobacion con todas las operaciones posibles, y que se nos devuelve la respuesta correcta.

## 6. Creamos el archivo calculator.tools.json dentro de la carpeta src/tools

aqui estara la definicion en formato json del schema que se usara para validar los datos que se enviaran a la ruta.

[IMAGEN de captura 5](Capturas/captura5.png)

## 7. Revisar la configuracion del index.ts

Aqui deben estar las rutas, pero se agregara swagger y swagger-ui para que se pueda ver la documentacion de la ruta, y que se pueda acceder a la documentacion de la ruta desde la url localhost:3000/docs

[IMAGEN de captura 6](Capturas/captura6.png)

## 8. Iniciar el servidor

Iremos a la url localhost:3000/docs y vera la documentacion de la ruta y probaremos 


[IMAGEN de captura 7](./Capturas/captura7.png)
[IMAGEN de captura 8](./Capturas/captura8.png)