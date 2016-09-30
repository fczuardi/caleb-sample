module.exports = {
    verifyToken: process.env.FB_VERIFY_TOKEN,
    appSecret: process.env.FB_APP_SECRET,
    botsTable: 'ct_bots',
    aws: {
        region: 'us-east-1'
    }
};
