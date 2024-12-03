const axios = require('axios');
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

const getWeather = async (location) => {
	const url = `${process.env.WEATHER_URL}/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}`;
	console.log(url);

	try {
		const response = await axios.get(url);
		const temp = response.data.main.temp - 273.15; // Convert Kelvin to Celsius;
		return `The temperature in ${location} is ${temp.toFixed(2)}°C.`;
	} catch (err) {
		return "Sorry, I couldn't fetch the weather for that location.";
	}
};
const getBotResponse = async (message) => {
	if (message.toLowerCase().includes('weather')) {
		const location = message.split(' ').pop(); // Assume the location is the last word.
		return await getWeather(location);
	} else {
		const intent = classifier.classify(message.toLowerCase());

		return (
			responses[intent] ||
			"I'm not sure how to respond to that. Can you rephrase?"
		);
	}
};

module.exports = getBotResponse;
