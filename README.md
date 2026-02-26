# Proyecto de Pruebas con Cypress - Automatización de API Mitte

Este proyecto consiste en la automatización de pruebas para una API encargada de la gestión de entradas, salidas y pagos de un parqueadero. Esta aplicación se comunica directamente con el autorizador de accesos para validar las transacciones.

## Estructura del Proyecto

El proyecto sigue una estructura modular para facilitar el mantenimiento y la escalabilidad:

- **`cypress/e2e/`**: Contiene los archivos de prueba (`.cy.js`) que definen los escenarios y casos de prueba (bloques `it`).

- **`cypress/support//`**: Carpeta principal para la lógica de soporte:

  - **`assertions/`**: Contiene las validaciones personalizadas (Asserts) para verificar respuestas de API y estados de base de datos.

  - **`page_objects//`** (Services): Contiene los objetos que encapsulan las solicitudes de envío a la API (lectura/escritura).

  - **`utils/`**: Generadores de datos (Data Generators) y funciones auxiliares para las pruebas.

  - **`constants/`**: Definición de constantes del proyecto, como nombres campos de API y mensajes de error.
  
  - **`commands.js`**: Comandos personalizados de Cypress (opcional).

## Instalación

Sigue estos pasos para instalar y configurar el proyecto en tu entorno local:

1. **Clonar el repositorio** (si aplica) o navegar a la carpeta del proyecto.
2. **Instalar dependencias**:
   Asegúrate de tener [Node.js](https://nodejs.org/) instalado y ejecuta el siguiente comando en la raíz del proyecto:
   ```bash
   npm install
   ```

## Ejecución de Pruebas

Puedes ejecutar las pruebas de tres maneras diferentes según tus necesidades:

### 1. Ejecución en el Navegador (Interfaz de Usuario de Cypress)
Para abrir el test runner de Cypress y ejecutar pruebas de forma interactiva:
```bash
npm run cy:open
```

### 2. Ejecución por Línea de Comandos (Modo Headless)
Para ejecutar todas las pruebas en segundo plano desde la terminal:
```bash
npm run test
```

### 3. Ejecución con Reportes Allure
Para generar y visualizar los reportes detallados de Allure:

- **Ejecutar pruebas capturando datos para Allure**:
  ```bash
  npm run test:allure
  ```
- **Generar el reporte de Allure**:
  ```bash
  npm run allure:report
  ```
- **Abrir el reporte generado**:
  ```bash
  npm run allure:open
  ```
- **Limpiar reportes anteriores y ejecutar todo el flujo**:
  ```bash
  npm run test:report
  ```

## Cambio de Variables de Entorno

El proyecto utiliza variables de entorno para gestionar credenciales y conexiones. Debes configurar un archivo `.env` en la raíz del proyecto con la siguiente estructura:

```env
# Configuración de Base de Datos (Oracle)
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_CONNECT_STRING=tu_string_de_conexion

# Autenticación Cognito
COGNITO_USERNAME=tu_usuario_cognito
COGNITO_PASSWORD=tu_password_cognito
COGNITO_CLIENT_ID=tu_client_id
```

---

## Documentación de Pruebas (Escenarios de Automatización)

### Gestión de Entradas (`CreateEntryStep.cy.js` y `CreateEntryValidation.cy.js`)

- **Entrada Exitosa**: Valida la entrada exitosa de un vehículo a un parqueadero Mitte con el servicio de Flypass, verificando tanto la respuesta de la API como el registro en la base de datos.

- **Entrada Rechazada**: Valida que la entrada sea rechazada cuando la placa no está autorizada.

- **Validaciones de Contrato**:
  - Validar que retorne `400 Bad Request` si faltan campos obligatorios como `sessionId`, `localIdentifier`, `actualStart` o `placeId`.
  - Validar que retorne `400` cuando los campos tienen valores inválidos (Nulos, Vacíos o formatos de fecha incorrectos).

### Gestión de Salidas (`CreateExitStep.cy.js` y `CreateExitValidation.cy.js`)

- **Salida Exitosa**: Valida la salida de un vehículo, asegurando que se procese correctamente en el sistema y se refleje en la base de datos.

- **Salida Rechazada**: Valida que la salida sea rechazada por placa no autorizada.

- **Flujo Completo (End-to-End)**: Registra una entrada exitosa y posteriormente una salida exitosa para el mismo vehículo/sesión.

- **Validaciones de Contrato**:
  - Validar que retorne `400 Bad Request` si faltan campos obligatorios como `sessionId`, `placeId`, `actualStart`, `currency` o `actualEnd`.
