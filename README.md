# Pasticely — Sistema Web de Gestión de Pedidos

## Descripción

Pasticely es una aplicación web empresarial diseñada para digitalizar y centralizar la gestión de pedidos en una pastelería.  
Permite registrar pedidos, buscar por cliente, filtrar por estado (Pendiente, En preparación, Listo, Entregado), controlar el acceso seguro mediante autenticación basada en token y generar comprobantes fácilmente vía WhatsApp.  

Este proyecto está contenerizado para facilitar su despliegue y mantenimiento, usando Docker para el backend (Node.js/Express) y frontend (nginx).

---

## Tecnologías y Stack

| Componente | Tecnología                  |
|------------|----------------------------|
| Frontend   | HTML5, Tailwind CSS, JavaScript (ES6+) |
| Backend    | Node.js, Express, dotenv   |
| Base de Datos | SQLite con persistencia local |
| Contenedores | Docker, Docker Compose    |
| Seguridad  | helmet, cors, tokens JWT simulados  
| Túnel HTTPS | ngrok (para entorno local y pruebas) |

---

## Estructura del Proyecto

pasticely-pedidos/ │ ├── backend/ # Código backend │ ├── controllers/ │ ├── database/ │ ├── middleware/ │ ├── routes/ │ ├── Dockerfile │ ├── server.js │ └── package.json │ ├── frontend/ # Archivos frontend estáticos │ ├── js/ │ ├── index.html │ ├── Dockerfile │ └── ... │ ├── docker-compose.yml # Orquestador Docker para levantar backend y frontend └── README.md # Archivo de documentación



---
## Requisitos Previos
- Docker y Docker Compose instalados  
- Node.js y npm (solo para desarrollo local)  
- ngrok para túnel seguro HTTPS (opcional pero recomendado)  
---
## Instrucciones para Ejecutar
1. **Clonar el repositorio**  
   ```bash
   git clone <URL-del-repositorio>
   cd pasticely-pedidos
Construir y levantar los contenedores con Docker Compose

bash


docker-compose up --build
Acceder a la aplicación frontend

Visitar en navegador: http://localhost:8080
Usar ngrok para exponer con HTTPS (opcional)

bash


ngrok http 8080
Usar la URL pública que ofrece ngrok para acceder desde cualquier lugar con HTTPS.
Funcionalidades principales
Autenticación sencilla con usuario admin@pasticely.com y contraseña pasticely123
Registro y gestión de pedidos con estados y filtros dinámicos
Envío de comprobantes a través de WhatsApp utilizando enlaces URL codificados
Aplicación modular con backend y frontend en contenedores separados
Seguridad
Protección de rutas con tokens Bearer
Cabeceras HTTP seguras con Helmet
CORS configurado para permitir acceso controlado
Consultas parametrizadas para evitar inyección SQL
Contacto y soporte
Para dudas o sugerencias, contactar a:
Francisco Javier Núñez González — 2212gonzalez96@gmail.com

Licencia
Este proyecto es para fines académicos y no comercialización.
