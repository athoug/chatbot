const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const getBotResponse = require('./bot');

require('dotenv').config();

const app = express();
const PORT = 3000;

// middleware
app.use(bodyParser.json());
app.use(
	session({
		secret: 'cool-cat',
		resave: false,
		saveUninitialized: true,
	})
);
app.use(express.static('public'));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.post('/chat', async (req, res) => {
	const userMessage = req.body.message;
	// check if the user has a history
	if (!req.session.history) {
		// if not assign it an empty array
		req.session.history = [];
	}
	// add the user message to the history
	req.session.history.push(userMessage);

	const botReply = await getBotResponse(userMessage);
	console.log(botReply);

	res.json({
		reply: botReply,
		history: req.session.history,
	});
});

app.listen(PORT, () => {
	console.log(`Chatbot server is running on http://localhost:${PORT}`);
});
