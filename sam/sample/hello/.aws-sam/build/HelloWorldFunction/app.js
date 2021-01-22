const axios = require('axios')
const envslackurl = process.env.SLACK_URL
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context, callback) => {
    try {
        //var message = "sam message, Hello world! 1";
        var message = event.Records[0].Sns.Message;
        console.log('Message received from SNS:', message);
        axios
            .post(envslackurl, {
                text: message
            })
            .then(res => {
                console.log(`statusCode: ${res.statusCode}`)
                console.log(res)
            })
            .catch(error => {
                console.error(error)
            })

            
    } catch (err) {
        console.log(err);
        return err;
    }
    callback(null, "Success");
};
