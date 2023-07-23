import { MongoClient} from 'mongodb'

const myEnv = (function() {
    if(process.env.NODE_ENV === 'production') {
        const {
            mongodb_username,
            mongodb_password,
            mongodb_clustername,
            mongodb_database,
        } = process.env;
        return {
            mongodb_username,
            mongodb_password,
            mongodb_clustername,
            mongodb_database,
        }
    }

    const {
        dev_mongodb_username,
        dev_mongodb_password,
        dev_mongodb_clustername,
        dev_mongodb_database,
    } = process.env;
    return {
        mongodb_username: dev_mongodb_username,
        mongodb_password: dev_mongodb_password,
        mongodb_clustername: dev_mongodb_clustername,
        mongodb_database: dev_mongodb_database,
    }
})()

const DB_URL =
    `mongodb+srv://${myEnv.mongodb_username}:${myEnv.mongodb_password}` +
    `@${myEnv.mongodb_clustername}.3c6jyg1.mongodb.net` +
    `/${myEnv.mongodb_database}?retryWrites=true&w=majority`;

export default async function handler(request, response) {
    if (request.method === 'POST') {
        const { email, name, message } = request.body;

        if (
            !email ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !message ||
            message.trim() === ''
        ) {
            return response.status(422).json({
                message: 'Invalid input.',
            });
        }

        // Store it in a database
        const receivedMessage = { email, name, message }

        let client;
        try {
            client = await MongoClient.connect(DB_URL)
        } catch(e) {
            response.status(500).json({
                message: 'Could not connect to database.'
            })
            return
        }

        const db = client.db()
        const collection = db.collection('messages')

        let result;
        try {
            result = await collection.insertOne(receivedMessage)
        } catch(e) {
            client.close()
            response.status(500).json({
                message: 'Storing message failed!'
            });
            return
        }        
        
        client.close()

        response
                .status(201)
                .json({
                    message: 'Successfully stored message!',
                    sentMessage: receivedMessage
                });
    }   
}
