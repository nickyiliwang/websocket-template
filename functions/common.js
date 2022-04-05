const AWS = require("aws-sdk");
const TABLE_NAME = "WS-Template";
const { uniqueNamesGenerator, starWars } = require("unique-names-generator");

function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message),
  };
}

const db = process.env.IS_OFFLINE
  ? new AWS.DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
    })
  : new AWS.DynamoDB.DocumentClient();

const client = process.env.IS_OFFLINE
  ? new AWS.ApiGatewayManagementApi({
      endpoint: "http://localhost:3001",
    })
  : new AWS.ApiGatewayManagementApi();

const sendToOne = async (id, body) => {
  try {
    await client
      .postToConnection({
        ConnectionId: id,
        Data: Buffer.from(JSON.stringify(body)),
      })
      .promise();
  } catch (error) {
    console.log(error);
  }
};

// all ids in the room
const sendToAll = async (ids, body) => {
  console.log("ids", ids);
  const shout = ids.map(({ id }) => sendToOne(id, body));
  return Promise.all(shout);
};

const generateNewName = async () => {
  const randomName = uniqueNamesGenerator({
    dictionaries: [starWars],
  });

  return randomName;
};

exports.sendToOne = sendToOne;
exports.sendToAll = sendToAll;
exports.generateNewName = generateNewName;
exports.response = response;
exports.client = client;
exports.db = db;
exports.TABLE_NAME = TABLE_NAME;
