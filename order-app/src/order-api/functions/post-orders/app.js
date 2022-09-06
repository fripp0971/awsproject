// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const uuid = require('node-uuid');
const { getCurrentDate } = require('/opt/dates');

const tableName = process.env.ORDER_TABLE;
const DEFAULT_ORDER_STATUS = "PENDING" // Default Order Status will be written to DynamoDB


exports.postOrders = async (event) => {
    let formattedDateNow = getCurrentDate();
    const { body } = event;   // It destructures the body payload from event. 
    let parsedBody = JSON.parse(body); // It parses the JSON payload to java script object 
    
    // The item contains fully order Item. 
    let item = {
        user_id : "static_user",   
        id: uuid.v4(),             
        name: parsedBody.name, 
        restaurantId: parsedBody.restaurantId, 
        quantity: parsedBody.quantity,
        createdAt: formattedDateNow.toString(),
        orderStatus: DEFAULT_ORDER_STATUS,
    }
    
    let params = {
        TableName : tableName,
        Item: item
    }; 

    // We use 'put' operator to put item to Dynamodb.
    try {
        const data = await docClient.put(params).promise()
        console.log("Success for putting Item")
        console.log(data)
    } catch (err) {
        console.log("Failure", err.message)
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(item)

    };
    return response;
}
