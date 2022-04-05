const { db, TABLE_NAME, response, sendToAll } = require("./common");

// ideally we don't want to scan the database
exports.handler = async (e) => {
  await db
    .scan({
      TableName: TABLE_NAME,
    })
    .promise()
    .then(({ Items }) => {
      console.log("scan success!", Items);
      const body = JSON.parse(e.body);
      sendToAll(Items, body.message);
    })
    .catch((err) => {
      console.log(err);
    });

  return response(200, "public");
};
