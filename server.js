const express = require('express');
const bodyParser = require('body-parser');
const getBotResponse = require('./bot');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Hello, this is a simple chatbot server!');
});

app.post('/chat', (req, res) => {
	const userMessage = req.body.message;
	const botReply = getBotResponse(userMessage);
	res.json({ reply: botReply });
});

app.listen(PORT, () => {
	console.log(`Chatbot server is running on http://localhost:${PORT}`);
});
