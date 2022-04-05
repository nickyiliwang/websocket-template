const { db, TABLE_NAME, response, sendToOne } = require("./common");

exports.handler = async (event, context, cb) => {
  let result;
  const id = event.requestContext.connectionId;

  try {
    result = await db
      .scan({
        TableName: TABLE_NAME,
      })
      .promise();
  } catch (error) {
    console.error(error);
  }

  try {
    await sendToOne(id, result);
  } catch (error) {
    console.error(error);
  }

  return cb(null, response(200, "default"));
};
