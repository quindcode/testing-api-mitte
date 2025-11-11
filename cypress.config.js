const { defineConfig } = require("cypress");
const oracledb = require("oracledb");
//const mssql = require('mssql');
require("dotenv").config();
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
const { getTemporaryCredentials } = require('./cypress/support/utils/AWSConnection.js');


// Establece la configuración de conexión para el ambiente de base de datos
const connection = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
};


// Establece la función para realizar consultas a la base de datos Oracle
function queryDB(query, values = []) { // <-- CAMBIO 1: Acepta 'values'
  return new Promise((resolve, reject) => {
    oracledb.getConnection(connection, (error, connection) => {
      if (error) {
        reject(error);
      } else {
        // CAMBIO 2: Pasa 'values' a .execute()
        connection.execute(query, values, (error, result) => { 
          connection.close(() => {
            if (error) {
              reject(error);
            } else {
              // ... (el resto de tu lógica de procesamiento está perfecta)
              if (result.rows) {
                const metaData = result.metaData || [];
                const processedResult = result.rows.map((row) => {
                  const obj = {};
                  metaData.forEach((column, index) => {
                    obj[column.name] = row[index];
                  });
                  return obj;
                });
                resolve(processedResult);
              } else {
                resolve({ rowsAffected: result.rowsAffected });
              }
            }
          });
        });
      }
    });
  });
}



module.exports = defineConfig({
  // Ajusta el tiempo de espera predeterminado en milisegundos
  defaultCommandTimeout: 5000,
  pageLoadTimeout: 10000,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    // Al iniciar la prueba esta será la url base
    baseUrl: "https://cert-providers.flypass.com.co/",

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

  // 🔹 Carga las variables del archivo .env en Cypress
      config.env.COGNITO_USERNAME = process.env.COGNITO_USERNAME;
      config.env.COGNITO_PASSWORD = process.env.COGNITO_PASSWORD;
      config.env.COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID;
      //console.log ("Esta es la variable de conexion" , CO)

      on("task", {
        queryDatabase({ query,values }) {
          return queryDB(query, values);
        },
        async awsSetTemporaryCredentials() {
          const awsCredentials = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
          };

          const credentials = await getTemporaryCredentials(awsCredentials.accessKeyId, awsCredentials.secretAccessKey);
          return credentials;
        }
      });
      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });
      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });
       return config;
    },
  },
});