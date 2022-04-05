const common = require("./common");
const handleNames = common.handleNames;

exports.handler = async (e) => {
  const {
    // body,
    requestContext: { connectionId },
  } = e;
  try {
    await handleNames.generateNewName(connectionId);
  } catch (error) {
    console.log(error);
  }

  const response = {
    statusCode: 200,
  };

  return response;
};
