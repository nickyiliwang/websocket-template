const { db, TABLE_NAME } = require("./common");

exports.handler = async (e) => {
  if (e.requestContext) {
    console.log("connectionId", e.requestContext.connectionId);
    db
      .put({
        TableName: TABLE_NAME,
        Item: { id: e.requestContext.connectionId },
      })
      .promise()
      .then((something) => {
        console.log("success!", something);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return {
    statusCode: 200,
  };
};
