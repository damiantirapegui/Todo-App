const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getTodoItem = async (event) => {
  console.log(event);
  const id = event.pathParameters.id;

  const params = {
    TableName: "Todos",
    Key: {
      id: id,
    },
  };

  try {
    const result = await dynamoDb.get(params).promise();

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Could not find Todo" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error("Error retrieving todo:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not retrieve Todo" }),
    };
  }
};
