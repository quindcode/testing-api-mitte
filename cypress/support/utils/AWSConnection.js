// cypress/support/utils/AWSConnection.js
const AWS = require('aws-sdk');

// Función para obtener las credenciales temporales
const getTemporaryCredentials = async (accessKeyId, secretAccessKey) => {
  let sessionToken="IQoJb3JpZ2luX2VjELH//////////wEaCXVzLWVhc3QtMSJHMEUCIAQkIIVvdOXl6DxEzNMNywNXrJyQ9vaR2fqmTaCSCHxWAiEAqKiQB1hpVfl5gX81HyXNVNGq1z17InvsfIzRnXBcj1gqlQMIShAAGgw2MjkxNjkxNDEzNzciDBouYjJrSvJoUr9FhCryAphzZeEqkPuaF4BGtW0mRxoxrsCVT9UAt543FtO6hrYVr9e9KG1ueEZM2fGopmsAL5z3b/eiBNvpHMXlJoZEheAWzIJFigvgUXt0KOYgqH8W0FPZBvN+d6Sb7vDVTgXKTWjCcVbv0aAF80mpbUUf2UcN5/vE6TAA5DACUzzgrTeq0JKKDeKf45qg73WAVzGiotXUOq99LMSZXYFUrrhr6TrELv0/xHRg9Z2iyK+1nUVz/4MPIbfujKHsIlBtq00jB8M9uwqLVhhrXH5FUuhlIz8diz8RpQAuEXEBwBXqOCOGfoqfXQx/3MyyaG7WsR9HXl3HLoO5ZfJuPwWEqDx1O8YuSRfaVpVa3oZBZD6ettkWR9DkCqBhuC2P1m5Qpau+1iINMphX1GWeo7oVOqeOSKu5DFgUVb9gXj1WD6U6ernPH/cjbIlIWQ8bvxvC+XOeeaNzXQ+TaOOonzbopobJBz4Fl80wdBGVl5CJJqaDntuK9cEwtJ6FpgY6pgEa0/BKGjYf3Vvtvh/3xoWisG4lv4+iw14pBRWJ7mnC3v4VwXKJMKrSyTcUnmSRReRhGAm7w5d+Q64CT0SUzvUufpy7UVJuc1zx0xw5tr1y5DiNYQi270L5zU9MM19/fYxwWK0NRkt41JKMohHSVHHvl6Apt7F/WJVHCkbmnULuh7OTdWU2cvN/RC0NEdUvWjc/kMC6PnMnX+3fkdTgcp6Qnl//Iw92"
  const sts = new AWS.STS({ accessKeyId, secretAccessKey , sessionToken, region:"us-east-1"});
  
  try {
    const response = await sts.getCallerIdentity().promise();
    return {
      accessKeyId: response.AccessKeyId,
      secretAccessKey: response.SecretAccessKey,
      sessionToken: response.SessionToken
    };
  } catch (error) {
    console.error('Error al obtener las credenciales temporales:', error);
    throw error;
  }
};

module.exports = { getTemporaryCredentials };