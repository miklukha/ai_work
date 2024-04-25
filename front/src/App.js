import './App.css';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { ContrastLight } from 'survey-core/themes/contrast-light';
import axios from 'axios';
import { StartPage } from './startPage';

axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.headers = { 'Access-Control-Allow-Origin': '*' };

const storageItemKey = 'my-survey';
const query = '';

const test = async (req, res) => {
  const response = await axios.get(`/get/${query}`);
  console.log(response);
  return response.data;
};

// test();

const surveyJson = {
  title: 'American History',
  showProgressBar: 'bottom',
  // showTimerPanel: 'top',
  // maxTimeToFinishPage: 10,
  // maxTimeToFinish: 30,
  firstPageIsStarted: true,
  startSurveyText: 'Почати',
  pages: [
    {
      elements: [
        {
          type: 'html',
          html: 'You are about to start a quiz on American history. <br>You will have 10 seconds for every question and 25 seconds to end the quiz.<br>Enter your name below and click <b>Start Quiz</b> to begin.',
        },
        {
          type: 'text',
          name: 'username',
          titleLocation: 'hidden',
          isRequired: true,
        },
      ],
    },
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
  ],
};

function saveSurveyData(survey) {
  const data = survey.data;
  if (!!data.username) {
    const page = survey.addNewPage('PersonalDetails');
    const j = page.fromJSON({
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
    });
  }
  window.localStorage.setItem(storageItemKey, JSON.stringify(data));
}

function App() {
  const survey = new Model(surveyJson);
  survey.applyTheme(ContrastLight);

  // survey.onComplete.add((sender, options) => {
  //   console.log(JSON.stringify(sender.data, null, 3));
  // });
  survey.onComplete.add(survey => {
    const resultData = [];

    for (const key in survey.data) {
      const question = survey.getQuestionByName(key);

      if (!!question) {
        const item = {
          name: key,
          value: question.value,
        };

        resultData.push(item);
      }
    }
    console.log(resultData);
  });

  survey.onValueChanged.add(saveSurveyData);

  const prevData = window.localStorage.getItem(storageItemKey) || null;

  if (prevData) {
    const data = JSON.parse(prevData);
    survey.data = data;

    if (data.pageNo) {
      survey.currentPageNo = data.pageNo;
    }
  }

  survey.onComplete.add(() => {
    window.localStorage.setItem(storageItemKey, '');
  });

  // const npsQuestion = survey.getValue('username');
  // console.log(survey.data);

  return <Survey model={survey} style={{ height: '100%' }} />;
  // return <StartPage />;
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
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
