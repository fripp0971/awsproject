{"filter":false,"title":"app.js","tooltip":"/order-app/populate-db/src/order-api/functions/get-orders/app.js","undoManager":{"mark":0,"position":0,"stack":[[{"start":{"row":0,"column":0},"end":{"row":56,"column":0},"action":"insert","lines":["// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.","// SPDX-License-Identifier: MIT-0","","const tableName = process.env.ORDER_TABLE;  // Gets the Order Table from environment variable.","const dynamodb = require('aws-sdk/clients/dynamodb');","const docClient = new dynamodb.DocumentClient();","","const fetchAllOrders = async (allData = [], exclusiveStartKey = null) => {","    let params = {","        TableName : tableName,","        //Limit: 100, // for testing","        ExclusiveStartKey: exclusiveStartKey","    };","","    // We use Scan operator to fetch whole items from table","    let data = await docClient.scan(params).promise();","    ","    //console.log(data)","","    // It puts all paginated items into array","    if (data['Items'].length > 0) {","        allData = [...allData, ...data['Items']]","    }","","    // We are paginating the items by checking LastEvaluatedKey","    if (data.LastEvaluatedKey) {","        return await fetchAllOrders(allData, data.LastEvaluatedKey);","","    } else {","        return data['Items'];","    }","}","","exports.getOrders = async (event) => {","    if (event.httpMethod !== 'GET') {","        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);","    }","    ","    console.info('received:', event);","    let items = {}","    ","    // It calls the fetchAllOrders method above","    try {","        items = await fetchAllOrders();","    } catch (err) {","        console.log(\"Failure\", err.message)","    }","","    // It returns the items to client with status code: 200","    const response =  {","        statusCode: 200,","        body: JSON.stringify(items)","    };","    return response;","","}",""],"id":1}]]},"ace":{"folds":[],"scrolltop":49,"scrollleft":0,"selection":{"start":{"row":56,"column":0},"end":{"row":56,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":2,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1662149757585,"hash":"07f9dc839b83c97ca4090c5760e955b3b0cf7c5f"}