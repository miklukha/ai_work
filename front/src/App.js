// import axios from 'axios';
import { Model } from 'survey-core';
import 'survey-core/defaultV2.min.css';
import { ContrastLight } from 'survey-core/themes/contrast-light';
import { Survey } from 'survey-react-ui';
import { useState, useEffect } from 'react';
import { CompletePage } from './CompletePage';
import { surveyJson } from './json';
import { BeginPage } from './BeginPage';

// const query = '';

// const test = async (req, res) => {
//   const response = await axios.get(`/get/${query}`);
//   console.log(response);
//   return response.data;
// };

// test();

// const onChange = survey => {
//   const data = survey.data;

//   if (!!data.query) {
//     const page = survey.addNewPage('PersonalDetails');
//     page.fromJSON({
//       elements: [
// {
//   type: 'radiogroup',
//   name: 'libertyordeath',
//   title: 'Whose quote is this: "Give me liberty, or give me death"?',
//   choicesOrder: 'random',
//   choices: [
//     'John Hancock',
//     'James Madison',
//     'Patrick Henry',
//     'Samuel Adams',
//   ],
//   correctAnswer: 'Patrick Henry',
// },
//       ],
//     });
//     // survey.endLoadingFromJson();
//     page.onSurveyLoad();
//   }
// };

const App = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [data, setData] = useState([]);

  const query = 'a';

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`/get/${query}`);
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const survey = new Model(surveyJson);
  //   survey.applyTheme(ContrastLight);
  //   setSurvey(survey);
  // }, []);

  // useEffect(() => {
  //   if (data.length !== 0) {
  //     if (survey) {
  //       survey.onComplete.add(survey => {
  //         const resultData = [];

  //         for (const key in survey.data) {
  //           console.log(survey.data);
  //           const question = survey.getQuestionByName(key);

  //           if (!!question) {
  //             const item = {
  //               name: key,
  //               value: question.value,
  //               title: question.displayValue,
  //               displayValue: question.displayValue,
  //             };

  //             resultData.push(item);
  //           }
  //         }

  //         setIsComplete(true);
  //       });
  //     }

  //     data.forEach(el => {
  //       const newPage = survey.addNewPage(el.elements[0].name);
  //       // console.log(el.elements[0].name);
  //       newPage.fromJSON(el);
  //     });

  //     const answersQ = data.reduce((prev, { elements }) => {
  //       return { ...prev, [elements[0].name]: elements[0].correctAnswer };
  //     }, {});
  //     setAnswers(answersQ);
  //   }
  // }, [data, survey]);

  // return !isComplete ? (
  //   <Survey model={survey} style={{ height: '100%' }} />
  // ) : (
  //   <CompletePage answers={answers} />
  // );
  return <BeginPage />;
};
// const App = () => {
//   const [isComplete, setIsComplete] = useState(false);
//   const [answers, setAnswers] = useState({});
//   const [data, setData] = useState([]);
//   const [survey, setSurvey] = useState(null);

//   const query = 'a';

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`/get/${query}`);
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []); // Ensure this useEffect runs only once on component mount

//   useEffect(() => {
//     if (data.length > 0) {
//       const survey = new Model(surveyJson);
//       setSurvey(survey);
//       survey.applyTheme(ContrastLight);

//       const newPages = data.map(el => {
//         const newPage = survey.addNewPage(el.elements[0].name);
//         newPage.fromJSON(el);
//         return newPage;
//       });

//       const answersQ = data.reduce((prev, { elements }) => {
//         return { ...prev, [elements[0].name]: elements[0].correctAnswer };
//       }, {});
//       setAnswers(answersQ);

//       survey.onComplete.add(() => {
//         setIsComplete(true);
//       });
//     }
//   }, [data]); // Run this useEffect whenever `data` changes

//   return !isComplete ? (
//     <Survey model={survey} style={{ height: '100%' }} />
//   ) : (
//     <CompletePage answers={answers} />
//   );
// };

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
