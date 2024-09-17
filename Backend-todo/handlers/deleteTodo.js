const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.deleteTodo = async (event) => {
  console.log(event);
  const id = event.pathParameters.id;
  console.log(id);

  const params = {
    TableName: "Todos",
    Key: {
      id: id,
    },
  };

  try {
    const response = await dynamoDb.delete(params).promise();
    console.log(response);
    if (!response) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Not found" }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: response }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Could not delete item" }),
    };
  }
};
