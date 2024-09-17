const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require("uuid");

module.exports.createTodo = async (event) => {
  try {
    // Kontrollera att body finns
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Request body is missing" }),
      };
    }

    const { text } = JSON.parse(event.body);

    // Kontrollera att alla nödvändiga fält finns
    if (!text) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Missing required fields: id, title, or description",
        }),
      };
    }

    const id = uuidv4();

    const params = {
      TableName: "Todos",
      Item: {
        id: id, // ID:t som skickas i begäran
        text: text,
        createdAt: new Date().toISOString(),
      },
    };

    // Lägg till objektet i DynamoDB
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        text: text,
        message: "Todo created successfully",
        id: id,
      }),
    };
  } catch (error) {
    console.error("Error creating todo:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Could not create todo",
        details: error.message,
      }),
    };
  }
};
