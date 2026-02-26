const { defineConfig } = require("cypress");
const oracledb = require("oracledb");
require("dotenv").config();
const { getTemporaryCredentials } = require('./cypress/support/utils/AWSConnection.js');


const connection = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
};


function queryDB(query, values = []) {
  return new Promise((resolve, reject) => {
    oracledb.getConnection(connection, (error, connection) => {
      if (error) {
        reject(error);
      } else {
        connection.execute(query, values, (error, result) => {
          connection.close(() => {
            if (error) {
              reject(error);
            } else {
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
  defaultCommandTimeout: 5000,
  pageLoadTimeout: 10000,
  e2e: {
    baseUrl: "https://cert-providers.flypass.com.co/",
    env: {
      allure: true,
      allureReuseAfterSpec: true,
    },
    setupNodeEvents(on, config) {
      const allureWriter = require('@shelex/cypress-allure-plugin/writer');
      allureWriter(on, config)

      config.env.COGNITO_USERNAME = process.env.COGNITO_USERNAME;
      config.env.COGNITO_PASSWORD = process.env.COGNITO_PASSWORD;
      config.env.COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID;

      on("task", {
        queryDatabase({ query, values }) {
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
      return config;
    },
  },
});