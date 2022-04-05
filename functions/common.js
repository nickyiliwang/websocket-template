const AWS = require("aws-sdk");
const ENDPOINT = "example.com";
const TABLE_NAME = "WS-Template";
const { uniqueNamesGenerator, starWars } = require("unique-names-generator");

const { v4: uuid } = require("uuid");

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
  : new AWS.ApiGatewayManagementApi({ endpoint: ENDPOINT });

// allows you to directly manage runtime aspects of your deployed APIs
const client = process.env.IS_OFFLINE
  ? new AWS.ApiGatewayManagementApi({
      endpoint: "http://localhost:3001",
    })
  : new AWS.ApiGatewayManagementApi({ endpoint: ENDPOINT });

const sendToOne = async (id, body) => {
  try {
    // Sends the provided data to the specified connection.
    await client
      .postToConnection({
        // receiving connection id
        ConnectionId: id,
        // body of message to the receiving id
        Data: Buffer.from(JSON.stringify(body)),
      })
      .promise(); // returns a promise callback
  } catch (error) {
    console.log(error);
  }
};

// all ids in the room
const sendToAll = async (ids, body) => {
  const shout = ids.map((id) => sendToOne(id, body));
  // resolve all shouts
  return Promise.all(shout);
};

const handleNames = {
  names: {},
  generateNewName: async (id) => {
    const randomName = uniqueNamesGenerator({
      dictionaries: [starWars],
    });
    const newNames = {
      ...handleNames.names,
      [id]: randomName,
    };
    handleNames.names = newNames;

    try {
      await sendToOne(id, {
        systemMessage: `Hey there, your connectionId is: ${id}, and your user name is ${randomName}`,
      });
    } catch (error) {
      console.log(error);
    }

    handleNames.updateNameList(id);
  },
  modifyNames: (id, name) => {
    const newNames = {
      ...handleNames.names,
      [id]: name,
    };
    handleNames.names = newNames;
    handleNames.updateNameList(id);
  },
  removeNameFromNames: async (id) => {
    // we want to remove name from room list upon disconnect
    await sendToAll(Object.keys(handleNames.names), {
      systemMessage: `${handleNames.names[id]} has left the chat`,
    });
    delete handleNames.names[id];
    await sendToAll(Object.keys(handleNames.names), {
      members: Object.values(handleNames.names),
    });
  },
  findName: (id) => {
    return handleNames["names"][id];
  },
  updateNameList: async (id) => {
    // send updated list to all
    await sendToAll(Object.keys(handleNames.names), {
      members: Object.values(handleNames.names),
    });
    // send updated user name to all
    await sendToAll(Object.keys(handleNames.names), {
      systemMessage: `${handleNames.names[id]} has joined the chat }`,
    });
  },
};

exports.sendToOne = sendToOne;
exports.sendToAll = sendToAll;
exports.response = response;
exports.handleNames = handleNames;
exports.client = client;
exports.db = db;
exports.TABLE_NAME = TABLE_NAME;
