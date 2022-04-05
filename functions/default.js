const { db, TABLE_NAME, response } = require("./common");

exports.handler = async (e) => {
  let result = await db
    .scan({
      TableName: TABLE_NAME,
    })
    .promise()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  return response(200, result);
};
