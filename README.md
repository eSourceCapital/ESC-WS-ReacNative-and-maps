# ESC-WS-ReactNative-and-Maps

## Verificar NodeJS & NPM
~~~
node -v 
npm -v 
~~~
En caso de no encontrar version en alguno de los comandos, descargar node: 

Node: https://nodejs.org/

## Creación de Proyecto
Para crear el proyecto utilizaremos create-expo-app

~~~
npm i create-expo-app
npx create-expo-app --template
~~~

Se nos preguntará el nombre de la aplicación, utilizaremos app-maps-rn, y seleccionaremos la opción de tabs con Typescript.

~~~
Name? app-maps-rn
Templete? tabs (Typescript)
~~~

Estos nos permitirá utilizar una plantilla con 2 tabs ya configuradas para la navegación.

## Inicialización del Proyecto
Para inicializar, lo primero, es necesario movernos a la carpeta del proyecto.

~~~
cd app-maps-rn
~~~

Una vez en la raiz del proyecto, podemos iniciarlo, para ello de manera interna se utilizará expo.

~~~
npm start
~~~

Este comando nos abrirá la interface de expo (expo start), donde podremos ver el código qr para android o ios.

## Requerimientos
Mapa con marcadores, que sean registrados como Tareas de una lista con estados: realizado y no realizado, con posibilidad de agregar nuevos.

## Estructura
En el workshop modificaremos las 2 tabs generadas automáticamente por la plantilla. Dejando en una, el espacio para la Lista de Tareas y en otra el Mapa.

## Insertando el Mapa
Para manejar más facilmente los mapas, usaremos el paquete react-native-maps, sostenido por AirBnB (https://www.npmjs.com/package/react-native-maps)

~~~
npm install react-native-maps
~~~

Ahora, podremos hacer uso de esta herramienta. Uso básico:
~~~
// En el componente o screen en donde se quiere mostrar el mapa:
import MapView from "react-native-maps";
<MapView
        style={{ height: "70%", width: "100%" }}
		  ... other props
/>
~~~

## Pasos a Realizar

1. Modificar las 2 tabs (TabXScreen.tsx)
2. Agregar el MapView a nuestra Segunda Tab (TabTwooScreen.tsx)

## Links importantes

- Expo: https://expo.dev/
- React Native Maps: https://github.com/react-native-maps/react-native-maps
- Google Maps: https://developers.google.com/maps/documentation
- SDK IOS: https://developers.google.com/maps/documentation/ios-sdk/overview
- SDK Android: https://developers.google.com/maps/documentation/android-sdk/overview
