const common = require("./common");
const handleNames = common.handleNames;

exports.handler = async (e) => {
  let body = {};
  try {
    if (e.body) {
      // expect stringified JSON
      body = JSON.parse(e.body);
    }
  } catch (error) {}

  // domainName, stage
  const { connectionId } = e.requestContext;

  try {
    await handleNames.modifyNames(connectionId, body.name);
  } catch (error) {
    console.log(error);
  }

  try {
    await common.sendToOne(connectionId, {
      systemMessage: `Hey there, your new name is ${body.name}`,
    });
  } catch (error) {
    console.log(error);
  }

  // https://stackoverflow.com/questions/47672377/message-internal-server-error-when-try-to-access-aws-gateway-api
  const response = {
    statusCode: 200,
    body: JSON.stringify("Success !"),
  };

  return response;
};
