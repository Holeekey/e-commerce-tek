# Prueba técnica backend Avila Tek

Este proyecto es una plantilla para una aplicación de Express con autenticación y autorización ya implementada. A continuación se describen los componentes principales de la aplicación.

## Estructura del Proyecto

```
express-ddd-template
├── src
│   ├── app.ts                  # Punto de entrada de la aplicación
│   └── [feature]               # Módulo
│       │── dom                 # Capa de dominio
│       │    │── [feature].ts   # Agregado o entidad principal del módulo
│       │    │── value-objects
│       │    │── exceptions
│       │    │── events
│       │    └── services
│       │── app                 # Capa de aplicación
│       │    │── services
│       │    │     └── [service-name]
│       │    │            │── dto                  #DTOs de entrada y salida de datos
│       │    │            └── [service-name].ts
│       │    │── models         # Entitades de datos de aplicación
│       │    │── exceptions
│       │    └── repositories   # Interfaces para la interacción con la BD
│       └── infra               # Capa de infraestructura
│            │── dto
│            │── repositories   # Implementación de repositorios de aplicación
│            └── routes         # Definición de endpoints
│
├── package.json                 # Configuración de npm
├── tsconfig.json                # Configuración de TypeScript
├── Dockerfile                   # Instrucciones para construir la imagen Docker
├── docker-compose.yaml          # Definición de servicios de Docker
└── README.md                    # Documentación del proyecto
```

## Instalación

1. Clona el repositorio en tu máquina local.
2. Navega al directorio del proyecto.
3. Ejecuta `npm install` para instalar las dependencias.

## Ejecución

Para ejecutar la aplicación, utiliza Docker y Docker Compose. Asegúrate de tenerlo instalado y ejecuta el siguiente comando:

```bash
docker-compose up -d
```

Esto levantará los servicios de MongoDB y la aplicación Node.js.

## Variables de Entorno

Asegúrate de definir las siguientes variables de entorno en un archivo `.env` en la raíz del proyecto (utiliza el de referencia `.env.template`):

- `PORT`: Puerto en el que se ejecutará la aplicación de Node.js.
- `MONGO_PORT`: Puerto en el que se ejecutará MongoDB.
- `JWT_SECRET`: Secreto para la autenticación JWT.
- `MONGO_URI_DOCKER`: URL para que la aplicación de Node.js en Docker se conecte con el contenedor de Mongo.
