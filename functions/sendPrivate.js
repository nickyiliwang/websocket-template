const common = require("./common");
const handleNames = common.handleNames;

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

    if (routeKey === "private") {
      const receiverId = body.receiverId;
      const message = body.message;
      const senderName = await handleNames.findName(connectionId);

      await common.sendToOne(receiverId, {
        privateMessage: `${senderName}: ${message}`,
      });
    }
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify("Public"),
  };

  return response;
};
