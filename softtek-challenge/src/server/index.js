/* eslint-disable no-undef */
import express from 'express';
import axios from 'axios';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import list from '../utils/callList.json' assert { type: 'json'};

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization'
};

config();

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

const callList = list;
let messageList = [];

app.get('/api/call-list', (req, res) => {
    res.json(callList);
});


app.get('/api/messages-list', async (req, res) => {
    console.log({messageList});
    res.json(messageList);
});

app.post('/api/call-list', (req, res) => {
    const data = req.body;

    if (!data) {
        return res.status(400).send('Dados da chamada não fornecidos');
    }

    callList.push(data);
    res.status(201).json(data);
});

app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o',
            messages: [
                {
                    "role":"system",
                    "content": process.env.EXPORTED_CONTENT,
                    },
                    ...messages.map(msg => ({
                        role: msg.sender.toLowerCase() === 'user' ? 'user' : 'system',
                        content: msg.text
                    }))
            ],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        
        const messageContent = response.data.choices[0].message.content;
        // messageList = messages;
        messageList = messageContent;
    
        res.json({ message: messageContent });

    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).send('Error communicating with OpenAI');
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});