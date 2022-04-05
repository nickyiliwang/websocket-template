exports.handler = async (e) => {
  if (e.requestContext) {
    // console.log("event log", e);
  }

  const response = {
    statusCode: 200,
  };

  return response;
};
