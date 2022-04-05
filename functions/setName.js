const { db, TABLE_NAME, sendToOne } = require("./common");

exports.handler = async (e) => {
  let body = {};
  try {
    if (e.body) {
      // expect stringified JSON
      body = JSON.parse(e.body);
    }
  } catch (error) {}

  const id = e.requestContext.connectionId;
  const name = body.name;

  const params = {
    Key: {
      id: id,
    },
    TableName: TABLE_NAME,
    ConditionExpression: "attribute_exists(id)",
    UpdateExpression: "SET username = :username",
    ExpressionAttributeValues: {
      ":username": name,
    },
    ReturnValues: "ALL_NEW",
  };

  db.update(params)
    .promise()
    .then(async ({ Attributes }) => {
      try {
        await sendToOne(id, {
          systemMessage: `Hey there, your new name is ${Attributes.username}`,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      console.error(err);
    });

  const response = {
    statusCode: 200,
    body: JSON.stringify("Success !"),
  };

  return response;
};
