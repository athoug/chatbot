const responses = {
	hello: 'Hi there! How can I help you?',
	help: 'I can assist you with general information. Ask me anything!',
	bye: 'Goodbye! Have a nice day!',
};

const getBotResponse = (message) => {
	message = message.toLowerCase();
	for (const keyword in responses) {
		if (message.includes(keyword)) {
			return responses[keyword];
		}
	}

	return "I'm not sure how to respond to that. Can you rephrase?";
};

module.exports = getBotResponse;
