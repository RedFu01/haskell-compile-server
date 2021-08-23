/* eslint-disable no-console */
import AWS from 'aws-sdk';
import admin from 'firebase-admin';
import CompileService from './CompileService';
import AwsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const {
    PORT,
    DEVELOPMENT_MODE
} = process.env;



const app = express();
app.use(morgan('tiny', {
    skip: (req, res) => !(DEVELOPMENT_MODE || res.statusCode >= 400)
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(AwsServerlessExpressMiddleware.eventContext());

app.post('/compile', async (req, res) => {
    const id = 'redfu';
    const service = new CompileService(id);
    const result = await service.compile(req.body);
    res.json({
        message: 'COOL',
        files: result
    })
});

app.get('/', (req, res) => res.json({
    status: 'UP'
}));

if (DEVELOPMENT_MODE) {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT || 'NONE'}`);
    });
}

export default app;
