const { db, TABLE_NAME, generateNewName, response } = require("./common");

exports.handler = async (event, context, cb) => {
  const id = event.requestContext.connectionId;
  const name = generateNewName();
  console.log("ENV API URL", process.env.ENDPOINT);

  await db
    .put({
      TableName: TABLE_NAME,
      Item: { id, username: name },
    })
    .promise()
    .then(() => {
      console.log("put success!", id);
    })
    .catch((err) => {
      console.error(err);
    });

  return cb(null, response(200, { body: "Connected" }));
};
