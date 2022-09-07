// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const uuid = require('node-uuid');
const { getCurrentDate } = require('/opt/dates');


const tableName = process.env.ORDER_TABLE;
const DEFAULT_ORDER_STATUS = "PENDING" // Default Order Status will be written to DynamoDB


exports.postOrders = async (event) => {
    console.log('here is the event',event);
    let formattedDateNow = getCurrentDate()
  
    // We are reading the records from SQS in a loop
    for (const record of event.Records) {
      const { messageId, body } = record // Now destructures the MessageId and Body from event.
      let parsedBody = JSON.parse(body) // Parses the Json to Javascript object
  
      // Instead of ussing uuid in Id, now we are passing MessageId to Id parameter in Item payload
      let item = {
        user_id: "static_user",
        id: messageId,
        name: parsedBody.data.name,
        restaurantId: parsedBody.data.restaurantId,
        quantity: parsedBody.data.quantity,
        createdAt: formattedDateNow.toString(),
        orderStatus: DEFAULT_ORDER_STATUS,
      }
  
      let params = {
        TableName: tableName,
        Item: item,
      }
  
      // Use Put method to put items into Dynamodb
      try {
        const data = await docClient.put(params).promise()
        console.log("Success for putting Item")
        console.log(data)
      } catch (err) {
        console.log("Failure", err.message)
      }
    }
    const response = {
      statusCode: 200,
    }
    return response
  }
