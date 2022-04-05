const { db, TABLE_NAME } = require("./common");

exports.handler = async (e) => {
  if (e.requestContext) {
    const id = e.requestContext.connectionId;

    await db
      .delete({
        TableName: TABLE_NAME,
        Key: {
          id: id,
        },
      })
      .promise()
      .then(() => {
        console.log("delete success!", id);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return {
    statusCode: 200,
  };
};
