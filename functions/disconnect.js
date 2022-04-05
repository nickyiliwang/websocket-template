const common = require("./common");
const handleNames = common.handleNames;

exports.handler = async (e) => {
  if (e.requestContext) {
    // console.log("event log", e);

    const connectionId = e.requestContext.connectionId;

    try {
      handleNames.removeNameFromNames(connectionId);
    } catch (error) {
      console.log(error);
    }
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello !"),
  };

  return response;
};
