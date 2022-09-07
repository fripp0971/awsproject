// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const dynamodb = require('aws-sdk/clients/dynamodb');
const { getCurrentDate } = require('/opt/dates');
const docClient = new dynamodb.DocumentClient();
const tableName = process.env.ORDER_TABLE;

exports.updateOrder = async (event) => {
    if (event.httpMethod !== 'PUT') {
        throw new Error(`updateItem only accept PUT method, you tried: ${event.httpMethod}`);
    }

    const formattedDateNow = getCurrentDate();

    const orderId = event.pathParameters.orderId; // It gets the OrderId from parameter. 
    const { body} = event;    // It destructures the 'body' payload from event
    let parsedBody = JSON.parse(body);  // It parses the JSON payload to java script object

    let item = {
        user_id : "static_user",   
        id: orderId
    }

    // The DynamoDB Update expression requires following parameters
    // We will be updating quantity or restaurantId or name
    // We are adding updatedAt parameter to Dynamodb in each update expression
    let params = {
        TableName : tableName,
        Key: item,
        UpdateExpression: "set quantity = :q, #nm = :n, restaurantId = :r, updatedAt = :u",
        ExpressionAttributeValues:{
            ":n": parsedBody.name,
            ":q": parsedBody.quantity,
            ":r": parsedBody.restaurantId,
            ":u": formattedDateNow
        },
        ExpressionAttributeNames:{
            "#nm": "name"
          },
        
        ReturnValues:"UPDATED_NEW"
    };

    // Calls the update expression to update the item
    try {
        const data = await docClient.update(params).promise();
        console.log("Success for updating Item")
        console.log(data)
    } catch (err) {
        console.log("Failure", err.message)
    }

    // It adds `updatedAt` parameter from current date.
    parsedBody['updatedAt'] = formattedDateNow;
    parsedBody['test'] = 'bob';
    

    const response = {
        statusCode: 200,
        body: JSON.stringify(parsedBody)
    };
    return response;
}
