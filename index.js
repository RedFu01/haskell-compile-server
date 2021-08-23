import 'dotenv/config';
import AwsServerlessExpress from 'aws-serverless-express';
import App from './src/app';

const server = AwsServerlessExpress.createServer(App);

exports.handler = (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    AwsServerlessExpress.proxy(server, event, context)
};
