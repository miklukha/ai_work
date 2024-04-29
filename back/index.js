import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';
import fs from 'fs';

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

// const test = () => {
//   // fs.readFile('survey.json', 'utf8', (err, data) => {
//   //   if (err) {
//   //     console.error(err);
//   //     return;
//   //   }

//   //   // console.log('data', data);

//   //   const jsonData = JSON.parse(data);

//   //   jsonData.title = 'Географія';
//   //   // toUpperCase()
//   //   jsonData.pages = [
//   //     {
//   //       elements: [
//   //         {
//   //           type: 'radiogroup',
//   //           name: 'civilwar',
//   //           title: 'When was the American Civil War?',
//   //           choices: ['1796-1803', '1810-1814', '1861-1865', '1939-1945'],
//   //           correctAnswer: '1861-1865',
//   //         },
//   //       ],
//   //     },
//   //     {
//   //       elements: [
//   //         {
//   //           type: 'radiogroup',
//   //           name: 'libertyordeath',
//   //           title: 'Whose quote is this: "Give me liberty, or give me death"?',
//   //           choicesOrder: 'random',
//   //           choices: [
//   //             'John Hancock',
//   //             'James Madison',
//   //             'Patrick Henry',
//   //             'Samuel Adams',
//   //           ],
//   //           correctAnswer: 'Patrick Henry',
//   //         },
//   //       ],
//   //     },
//   //     {
//   //       elements: [
//   //         {
//   //           type: 'radiogroup',
//   //           name: 'magnacarta',
//   //           title: 'What is Magna Carta?',
//   //           choicesOrder: 'random',
//   //           choices: [
//   //             'The foundation of the British parliamentary system',
//   //             'The Great Seal of the monarchs of England',
//   //             'The French Declaration of the Rights of Man',
//   //             'The charter signed by the Pilgrims on the Mayflower',
//   //           ],
//   //           correctAnswer: 'The foundation of the British parliamentary system',
//   //         },
//   //       ],
//   //     },
//   //   ];

//   //   // console.log('jsonData', jsonData);

//   //   // jsonData.push({
//   //   //   question: messageText,
//   //   //   answered: false,
//   //   //   from: msg.chat.first_name,
//   //   // });

//   //   const updatedData = JSON.stringify(jsonData, null, 2); // the '2' parameter for pretty formatting

//   //   console.log(updatedData);

//   //   fs.writeFile('survey.json', updatedData, err => {
//   //     if (err) {
//   //       console.error(err);
//   //     } else {
//   //       console.log('Data added successfully.');
//   //     }
//   //   });
//   // });
// };
// test();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/get/:query', async (req, res) => {
  const { query } = req.params;

  try {
    const questions = await getQuestions(query);

    // fs.readFile('survey.json', 'utf8', (err, data) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }

    //   res.send(data);
    // });

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

    // fs.readFile('survey.json', 'utf8', (err, data) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }

    //   res.send(data);
    // });
  } catch (error) {
    console.log(error);
    return null;
  }
});

// app.get('/get', async (req, res) => {
//   fs.readFile('survey.json', 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     res.send(data);
//   });
// });

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
