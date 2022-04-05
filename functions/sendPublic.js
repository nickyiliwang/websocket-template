const { db, TABLE_NAME, response, sendToAll } = require("./common");

// ideally we don't want to scan the database
exports.handler = async (e, context, cb) => {
  await db
    .scan({
      TableName: TABLE_NAME,
    })
    .promise()
    .then(async ({ Items }) => {
      console.log("scan success!", Items);
      const body = JSON.parse(e.body);
      await sendToAll(Items, body.message);
    })
    .catch((err) => {
      console.log(err);
    });

  return cb(null, response(200, "public"));
};
