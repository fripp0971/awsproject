{"filter":false,"title":"app.js","tooltip":"/order-app/src/order-api/functions/get-orders/app.js","undoManager":{"mark":10,"position":10,"stack":[[{"start":{"row":0,"column":0},"end":{"row":56,"column":0},"action":"insert","lines":["// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.","// SPDX-License-Identifier: MIT-0","","const tableName = process.env.ORDER_TABLE;  // Gets the Order Table from environment variable.","const dynamodb = require('aws-sdk/clients/dynamodb');","const docClient = new dynamodb.DocumentClient();","","const fetchAllOrders = async (allData = [], exclusiveStartKey = null) => {","    let params = {","        TableName : tableName,","        //Limit: 100, // for testing","        ExclusiveStartKey: exclusiveStartKey","    };","","    // We use Scan operator to fetch whole items from table","    let data = await docClient.scan(params).promise();","    ","    //console.log(data)","","    // It puts all paginated items into array","    if (data['Items'].length > 0) {","        allData = [...allData, ...data['Items']]","    }","","    // We are paginating the items by checking LastEvaluatedKey","    if (data.LastEvaluatedKey) {","        return await fetchAllOrders(allData, data.LastEvaluatedKey);","","    } else {","        return data['Items'];","    }","}","","exports.getOrders = async (event) => {","    if (event.httpMethod !== 'GET') {","        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);","    }","    ","    console.info('received:', event);","    let items = {}","    ","    // It calls the fetchAllOrders method above","    try {","        items = await fetchAllOrders();","    } catch (err) {","        console.log(\"Failure\", err.message)","    }","","    // It returns the items to client with status code: 200","    const response =  {","        statusCode: 200,","        body: JSON.stringify(items)","    };","    return response;","","}",""],"id":1}],[{"start":{"row":43,"column":39},"end":{"row":44,"column":0},"action":"insert","lines":["",""],"id":2},{"start":{"row":44,"column":0},"end":{"row":44,"column":8},"action":"insert","lines":["        "]},{"start":{"row":44,"column":8},"end":{"row":44,"column":9},"action":"insert","lines":["c"]},{"start":{"row":44,"column":9},"end":{"row":44,"column":10},"action":"insert","lines":["o"]},{"start":{"row":44,"column":10},"end":{"row":44,"column":11},"action":"insert","lines":["n"]},{"start":{"row":44,"column":11},"end":{"row":44,"column":12},"action":"insert","lines":["s"]},{"start":{"row":44,"column":12},"end":{"row":44,"column":13},"action":"insert","lines":["o"]},{"start":{"row":44,"column":13},"end":{"row":44,"column":14},"action":"insert","lines":["l"]},{"start":{"row":44,"column":14},"end":{"row":44,"column":15},"action":"insert","lines":["e"]},{"start":{"row":44,"column":15},"end":{"row":44,"column":16},"action":"insert","lines":["."]},{"start":{"row":44,"column":16},"end":{"row":44,"column":17},"action":"insert","lines":["o"]},{"start":{"row":44,"column":17},"end":{"row":44,"column":18},"action":"insert","lines":["g"]}],[{"start":{"row":44,"column":17},"end":{"row":44,"column":18},"action":"remove","lines":["g"],"id":3},{"start":{"row":44,"column":16},"end":{"row":44,"column":17},"action":"remove","lines":["o"]}],[{"start":{"row":44,"column":16},"end":{"row":44,"column":17},"action":"insert","lines":["l"],"id":4},{"start":{"row":44,"column":17},"end":{"row":44,"column":18},"action":"insert","lines":["o"]},{"start":{"row":44,"column":18},"end":{"row":44,"column":19},"action":"insert","lines":["g"]}],[{"start":{"row":44,"column":19},"end":{"row":44,"column":21},"action":"insert","lines":["()"],"id":5}],[{"start":{"row":44,"column":20},"end":{"row":44,"column":22},"action":"insert","lines":["''"],"id":6}],[{"start":{"row":44,"column":21},"end":{"row":44,"column":22},"action":"insert","lines":["i"],"id":7},{"start":{"row":44,"column":22},"end":{"row":44,"column":23},"action":"insert","lines":["t"]},{"start":{"row":44,"column":23},"end":{"row":44,"column":24},"action":"insert","lines":["e"]},{"start":{"row":44,"column":24},"end":{"row":44,"column":25},"action":"insert","lines":["m"]},{"start":{"row":44,"column":25},"end":{"row":44,"column":26},"action":"insert","lines":["s"]}],[{"start":{"row":44,"column":27},"end":{"row":44,"column":28},"action":"insert","lines":[","],"id":8},{"start":{"row":44,"column":28},"end":{"row":44,"column":29},"action":"insert","lines":["i"]},{"start":{"row":44,"column":29},"end":{"row":44,"column":30},"action":"insert","lines":["t"]},{"start":{"row":44,"column":30},"end":{"row":44,"column":31},"action":"insert","lines":["e"]},{"start":{"row":44,"column":31},"end":{"row":44,"column":32},"action":"insert","lines":["m"]},{"start":{"row":44,"column":32},"end":{"row":44,"column":33},"action":"insert","lines":["s"]}],[{"start":{"row":44,"column":34},"end":{"row":44,"column":35},"action":"insert","lines":[";"],"id":9}],[{"start":{"row":44,"column":34},"end":{"row":44,"column":35},"action":"remove","lines":[";"],"id":10},{"start":{"row":44,"column":33},"end":{"row":44,"column":34},"action":"remove","lines":[")"]},{"start":{"row":44,"column":32},"end":{"row":44,"column":33},"action":"remove","lines":["s"]},{"start":{"row":44,"column":31},"end":{"row":44,"column":32},"action":"remove","lines":["m"]},{"start":{"row":44,"column":30},"end":{"row":44,"column":31},"action":"remove","lines":["e"]},{"start":{"row":44,"column":29},"end":{"row":44,"column":30},"action":"remove","lines":["t"]},{"start":{"row":44,"column":28},"end":{"row":44,"column":29},"action":"remove","lines":["i"]},{"start":{"row":44,"column":27},"end":{"row":44,"column":28},"action":"remove","lines":[","]},{"start":{"row":44,"column":26},"end":{"row":44,"column":27},"action":"remove","lines":["'"]},{"start":{"row":44,"column":25},"end":{"row":44,"column":26},"action":"remove","lines":["s"]},{"start":{"row":44,"column":24},"end":{"row":44,"column":25},"action":"remove","lines":["m"]},{"start":{"row":44,"column":23},"end":{"row":44,"column":24},"action":"remove","lines":["e"]},{"start":{"row":44,"column":22},"end":{"row":44,"column":23},"action":"remove","lines":["t"]},{"start":{"row":44,"column":21},"end":{"row":44,"column":22},"action":"remove","lines":["i"]},{"start":{"row":44,"column":20},"end":{"row":44,"column":21},"action":"remove","lines":["'"]},{"start":{"row":44,"column":19},"end":{"row":44,"column":20},"action":"remove","lines":["("]},{"start":{"row":44,"column":18},"end":{"row":44,"column":19},"action":"remove","lines":["g"]},{"start":{"row":44,"column":17},"end":{"row":44,"column":18},"action":"remove","lines":["o"]},{"start":{"row":44,"column":16},"end":{"row":44,"column":17},"action":"remove","lines":["l"]},{"start":{"row":44,"column":15},"end":{"row":44,"column":16},"action":"remove","lines":["."]},{"start":{"row":44,"column":14},"end":{"row":44,"column":15},"action":"remove","lines":["e"]},{"start":{"row":44,"column":13},"end":{"row":44,"column":14},"action":"remove","lines":["l"]},{"start":{"row":44,"column":12},"end":{"row":44,"column":13},"action":"remove","lines":["o"]},{"start":{"row":44,"column":11},"end":{"row":44,"column":12},"action":"remove","lines":["s"]},{"start":{"row":44,"column":10},"end":{"row":44,"column":11},"action":"remove","lines":["n"]},{"start":{"row":44,"column":9},"end":{"row":44,"column":10},"action":"remove","lines":["o"]},{"start":{"row":44,"column":8},"end":{"row":44,"column":9},"action":"remove","lines":["c"]}],[{"start":{"row":44,"column":4},"end":{"row":45,"column":4},"action":"remove","lines":["    ","    "],"id":11}]]},"ace":{"folds":[],"scrolltop":455.5,"scrollleft":0,"selection":{"start":{"row":44,"column":4},"end":{"row":44,"column":4},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":29,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1662150415769,"hash":"07f9dc839b83c97ca4090c5760e955b3b0cf7c5f"}