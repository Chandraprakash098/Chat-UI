import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const predefinedResponses: { [key: string]: string } = {
  'hi': 'Hello! How can I help you today?',
  'hello': 'Hello! How can I help you today?',
  'tell me about diamonds': 'Diamonds are a girl\'s best friend! They are timeless and elegant.',
  'what about gold jewelry?': 'Gold jewelry is classic and versatile. It never goes out of style.',
  'can you tell me about silver?': 'Silver jewelry is a great choice for those who love a more understated look.',
  'bye': 'Thank you for chatting! Have a great day!',
  'goodbye': 'Thank you for chatting! Have a great day!',
  "what's your favorite color?": "I'm not sure about that. Can you please specify?"
};

// Function to simulate delay
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message.toLowerCase().trim();
  
  let response = "I'm not sure about that. Can you please specify?";
  
  // Check for exact matches first
  if (predefinedResponses.hasOwnProperty(userMessage)) {
    response = predefinedResponses[userMessage];
  } else {
    // If no exact match, check for partial matches
    for (const key in predefinedResponses) {
      if (userMessage.includes(key)) {
        response = predefinedResponses[key];
        break;
      }
    }
  }
  
  // Simulate a delay between 1 to 3 seconds
  const delay = Math.floor(Math.random() * 2000) + 1000;
  await simulateDelay(delay);
  
  res.json({ message: response });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});