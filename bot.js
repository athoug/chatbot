const natural = require('natural');
const responses = {
	greet: 'Hi! How can I assist you?',
	help: 'I can help you with general inquiries or guide you through something specific. Try asking!',
	farewell: 'Goodbye! Feel free to reach out anytime.',
};

const classifier = new natural.BayesClassifier();

// training the bot
classifier.addDocument('hello', 'greet');
classifier.addDocument('hi', 'greet');
classifier.addDocument('how are you', 'greet');
classifier.addDocument('what is your name', 'greet');

classifier.addDocument('help', 'help');
classifier.addDocument('can you help me', 'help');
classifier.addDocument('I need assistance', 'help');

classifier.addDocument('bye', 'farewell');
classifier.addDocument('see you later', 'farewell');

classifier.train();

const getBotResponse = (message) => {
	const intent = classifier.classify(message.toLowerCase());

	return (
		responses[intent] ||
		"I'm not sure how to respond to that. Can you rephrase?"
	);
};

module.exports = getBotResponse;
