import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
const router = express.Router();
config();

const { KEY, PORT = 5000 } = process.env;
const openai = new OpenAI({ apiKey: KEY });

const getQuestions = async query => {
  try {
    const prompt = `Створи вікторину на тему ${query} і поверни в такому вигляді [
      {
        elements: [
          {
            type: 'radiogroup',
            name: 'civilwar',
            title: 'When was the American Civil War?',
            choices: ['1796-1803', '1810-1814', '1861-1865', '1939-1945'],
            correctAnswer: '1861-1865',
          },
        ],
      },
      {
        elements: [
          {
            type: 'radiogroup',
            name: 'libertyordeath',
            title: 'Whose quote is this: "Give me liberty, or give me death"?',
            choices: [
              'John Hancock',
              'James Madison',
              'Patrick Henry',
              'Samuel Adams',
            ],
            correctAnswer: 'Patrick Henry',
          },
        ],
      },
      {
        elements: [
          {
            type: 'radiogroup',
            name: 'magnacarta',
            title: 'What is Magna Carta?',
            choices: [
              'The foundation of the British parliamentary system',
              'The Great Seal of the monarchs of England',
              'The French Declaration of the Rights of Man',
              'The charter signed by the Pilgrims on the Mayflower',
            ],
            correctAnswer: 'The foundation of the British parliamentary system',
          },
        ],
      },
    ] але всі питання і відповіді і теми повинні бути українською. запитань має бути 2`;

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
    console.log('questions', questions);
    res.json(questions);
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
