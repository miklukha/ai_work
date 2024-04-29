import axios from 'axios';
import { useState } from 'react';
import { Model } from 'survey-core';
import 'survey-core/defaultV2.min.css';
import { ContrastLight } from 'survey-core/themes/contrast-light';
import { Survey } from 'survey-react-ui';
import { SurveyPage } from './SurveyPage';

axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.headers = { 'Access-Control-Allow-Origin': '*' };

const surveyJson = {
  title: 'ВІКТОРИНА',
  firstPageIsStarted: true,
  completeText: 'Почати',
  completedHtml:
    '<h3>Зачекайте, будь ласка, штучний інтелект генерує вашу вікторину <br> на тему "{query}" <br> <br> <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> </h3>',
  pages: [
    {
      elements: [
        {
          type: 'html',
          html: 'Вікторина на будь-яку тему за допомогою штучного інтелекту:) <br> Введіть, будь ласка, бажану тему та натисніть кнопку <b>Почати</b>',
        },
        {
          type: 'text',
          name: 'query',
          titleLocation: 'hidden',
          isRequired: true,
        },
      ],
    },
  ],
};

export const BeginPage = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState({});

  const survey = new Model(surveyJson);
  survey.applyTheme(ContrastLight);

  survey.onComplete.add(async () => {
    const { query } = survey.data;

    try {
      const response = await axios.get(`/get/${query}`);
      const survey = response.data;
      const surveyAnswers = survey.pages.reduce((obj, { elements }) => {
        return {
          ...obj,
          [elements[0].name]: elements[0].correctAnswer,
        };
      }, {});

      setData(survey);
      setAnswers(surveyAnswers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setIsComplete(true);
  });

  return !isComplete ? (
    <Survey model={survey} style={{ height: '100%' }} />
  ) : (
    <SurveyPage answers={answers} data={data} />
  );
};
