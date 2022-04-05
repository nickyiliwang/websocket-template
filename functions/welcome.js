const { db, TABLE_NAME, sendToOne, response } = require("./common");

exports.handler = async (e, context, cb) => {
  if (e.requestContext) {
    const id = e.requestContext.connectionId;
    await db
      .get({
        TableName: TABLE_NAME,
        Key: {
          id,
        },
      })
      .promise()
      .then(async ({ Item }) => {
        console.log("get success!", Item);
        await sendToOne(id, `Hello there ${Item.username}!`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return cb(null, response(200, "welcome"));
};
