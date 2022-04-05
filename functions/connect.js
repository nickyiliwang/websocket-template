const { db, TABLE_NAME, generateNewName } = require("./common");

exports.handler = async (e) => {
  if (e.requestContext) {
    const id = e.requestContext.connectionId;
    const name = await generateNewName();

    db.put({
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
  }

  return {
    statusCode: 200,
  };
};
