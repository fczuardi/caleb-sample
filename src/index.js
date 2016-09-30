import { verifyToken, appSecret, botsTable, aws } from '../config';
import express from 'express';
import { FacebookMessengerBot } from 'calamars';
import AWS from 'aws-sdk';

const app = express();

// cALEB, c4138, aleb!
const port = 4138;
const listeners = {
    onMessage: m => {
        console.log('message:', JSON.stringify(m));
    }
};
const defaultOptions = {
    verifyToken,
    listeners,
    appSecret
};

AWS.config.update(aws);
const dynamo = new AWS.DynamoDB.DocumentClient();

const getBotConfig = (customerId, botId) => dynamo.get({
    TableName: botsTable,
    Key: {
        id: botId,
        customerId
    }
}).promise().then(data => (data.Item ? data.Item : data));

app.post('/launchBot/:customerId/:botId', (req, res) => {
    const botId = req.params.botId;
    const customerId = req.params.customerId;
    return getBotConfig(customerId, botId).then(result => {
        // create new bot and attach it to the existing express server
        const pageToken = result.facebook.pageAccessToken;
        const bot = new FacebookMessengerBot({
            ...defaultOptions,
            callbackPath: `/${customerId}/${botId}`,
            pageTokens: [pageToken]
        });
        bot.setupExpressApp(app);
        return res.send(
            `bot id: ${botId} customer id: ${customerId}\n\n${JSON.stringify(result)}`
        );
    });
});

app.listen(port);
