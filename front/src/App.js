import axios from 'axios';
import { Model } from 'survey-core';
import 'survey-core/defaultV2.min.css';
import { ContrastLight } from 'survey-core/themes/contrast-light';
import { Survey } from 'survey-react-ui';
import { useState } from 'react';
import { CompletePage } from './CompletePage';
import { surveyJson } from './json';

axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.headers = { 'Access-Control-Allow-Origin': '*' };

const query = '';

const test = async (req, res) => {
  const response = await axios.get(`/get/${query}`);
  console.log(response);
  return response.data;
};

// test();

// const onChange = survey => {
//   const data = survey.data;

//   if (!!data.query) {
//     const page = survey.addNewPage('PersonalDetails');
//     page.fromJSON({
//       elements: [
//         {
//           type: 'radiogroup',
//           name: 'libertyordeath',
//           title: 'Whose quote is this: "Give me liberty, or give me death"?',
//           choicesOrder: 'random',
//           choices: [
//             'John Hancock',
//             'James Madison',
//             'Patrick Henry',
//             'Samuel Adams',
//           ],
//           correctAnswer: 'Patrick Henry',
//         },
//       ],
//     });
//     // survey.endLoadingFromJson();
//     page.onSurveyLoad();
//   }
// };

function App() {
  const [isComplete, setIsComplete] = useState(false);

  const survey = new Model(surveyJson);
  survey.applyTheme(ContrastLight);

  survey.onComplete.add(survey => {
    const resultData = [];

    for (const key in survey.data) {
      const question = survey.getQuestionByName(key);

      if (!!question) {
        const item = {
          name: key,
          value: question.value,
          title: question.displayValue,
          displayValue: question.displayValue,
        };

        resultData.push(item);
      }
    }

    setIsComplete(true);
  });

  return !isComplete ? (
    <Survey model={survey} style={{ height: '100%' }} />
  ) : (
    <CompletePage />
  );
}

export default App;

/**
 * {
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
          choicesOrder: 'random',
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
          choicesOrder: 'random',
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
 */
