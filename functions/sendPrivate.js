const { db, response, TABLE_NAME, sendToOne } = require("./common");

exports.handler = async (e) => {
  if (e.requestContext) {
    const id = e.requestContext.connectionId;
    let senderName;

    db.get({
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    })
      .promise()
      .then(async ({ Item }) => {
        console.log("get success!", Item);
        senderName = Item.username;

        let body = JSON.parse(e.body);

        // receiverId needs validation ideally
        const receiverId = body.receiverId;
        if (!receiverId) return;
        const message = body.message;

        await sendToOne(receiverId, {
          privateMessage: `${senderName}: ${message}`,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return response(200, "Private");
};
