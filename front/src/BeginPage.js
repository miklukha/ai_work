import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { ContrastLight } from 'survey-core/themes/contrast-light';
import { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.headers = { 'Access-Control-Allow-Origin': '*' };

const surveyJson = {
  title: 'Вікторина',
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

  const survey = new Model(surveyJson);
  survey.applyTheme(ContrastLight);

  // survey.onComplete.add(async () => {
  //   const { query } = survey.data;

  //   // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`/get/${query}`);
  //     console.log(response.data.message.content);
  //     // setData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }

  //   setIsComplete(true);
  //   // };
  // });

  return !isComplete ? (
    <Survey model={survey} style={{ height: '100%' }} />
  ) : (
    <div>SSSSSSS</div>
  );
};
