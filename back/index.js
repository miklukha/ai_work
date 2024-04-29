import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import fs from 'fs';
import OpenAI from 'openai';

const app = express();
config();

const { KEY, PORT = 5000 } = process.env;
const openai = new OpenAI({ apiKey: KEY });

const getQuestions = async query => {
  try {
    const prompt = `Створи вікторину на тему ${query} і поверни в такому вигляді json формат (не вказуй в якому форматі ти повертає) [
  {
    "elements": [
      {
        "type": "radiogroup",
        "name": "highestmountain",
        "title": "Яка найвища гора в світі?",
        "choices": ["Кіліманджаро", "Еверест", "Монблан", "К2"],
        "correctAnswer": "Еверест"
      }
    ]
  },
  {
    "elements": [
      {
        "type": "radiogroup",
        "name": "largestocean",
        "title": "Який найбільший океан у світі?",
        "choices": ["Атлантичний океан", "Індійський океан", "Південний океан", "Тихий океан"],
        "correctAnswer": "Тихий океан"
      }
    ]
  }
] але всі питання і відповіді і теми повинні бути українською. запитань має бути 10`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4-turbo',
      temperature: 0.5,
      max_tokens: 4000,
    });

    return completion.choices[0];
  } catch (error) {
    console.log(error);
  }
};

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/get/:query', async (req, res) => {
  const { query } = req.params;

  try {
    const questions = await getQuestions(query);

    fs.readFile('survey.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const jsonData = JSON.parse(data);

      jsonData.title = query.toUpperCase();
      jsonData.pages = JSON.parse(questions.message.content);

      const updatedData = JSON.stringify(jsonData, null, 2);
      console.log('updatedData', updatedData);

      fs.writeFile('survey.json', updatedData, err => {
        if (err) {
          console.error(err);
        } else {
          console.log('Data added successfully.');
          res.send(updatedData);
        }
      });
    });
  } catch (error) {
    console.log(error);
    return null;
  }
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
