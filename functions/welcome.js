const { db, TABLE_NAME, sendToOne } = require("./common");

exports.handler = async (e) => {
  if (e.requestContext) {
    const id = e.requestContext.connectionId;
    db.get({
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    })
      .promise()
      .then(({ Item }) => {
        console.log("get success!", Item);
        sendToOne(id, `Hello there ${Item.username} !`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return {
    statusCode: 200,
  };
};
