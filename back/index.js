import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

const app = express();
const router = express.Router();
config();

const { KEY, PORT = 5000 } = process.env;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/get/:query', (req, res) => {
  const { query } = req.params;

  res.json({ m: 'GET request to the homepage' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// const axios = require('axios');

// // Function to generate prompt
// function generatePrompt() {
//   let typeQ = 'географія України';
//   let totalPrompt = `Створити квіз на тему ${typeQ} і поверни в такому вигляді const surveyJson = { ... } але всі питання і відповеді і теми повині бути українською`;
//   return totalPrompt;
// }

// // Function to send prompt to OpenAI API
// async function sendPromptToOpenAI(prompt) {
//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/engines/gpt-4/completions',
//       {
//         prompt: prompt,
//         temperature: 0.5,
//         max_tokens: 4000,
//         stop: [],
//       },
//       {
//         headers: {
//           Authorization: 'Bearer YOUR_OPENAI_API_KEY',
//         },
//       },
//     );
//     return response.data.choices[0].text;
//   } catch (error) {
//     console.error('Error:', error);
//     return null;
//   }
// }

// // Example function to simulate the flow
// async function simulateFlow() {
//   const prompt = generatePrompt();
//   const response = await sendPromptToOpenAI(prompt);
//   console.log(response);
// }

// // Call the function to simulate the flow
// simulateFlow();
