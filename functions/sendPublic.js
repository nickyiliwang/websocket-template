const common = require("./common");

exports.handler = async (e) => {
  if (e.requestContext) {
    // console.log("event log", e);

    // might need domainName, stage
    const connectionId = e.requestContext.connectionId;
    const routeKey = e.requestContext.routeKey;

    let body = {};
    try {
      if (e.body) {
        // expect stringified JSON
        body = JSON.parse(e.body);
      }
    } catch (error) {}

    if (routeKey === "public") {
      const message = body.message;

      await common.sendToAll([connectionId], {
        publicMessage: message,
      });
    }
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify("Public"),
  };

  return response;
};
