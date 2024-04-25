import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { ContrastLight } from 'survey-core/themes/contrast-light';

const surveyJson = {
  title: 'Вікторина',
  showProgressBar: 'bottom',
  // showTimerPanel: 'top',
  // maxTimeToFinishPage: 10,
  // maxTimeToFinish: 30,
  firstPageIsStarted: true,
  startSurveyText: 'Розпочати',
  pages: [
    {
      elements: [
        {
          type: 'html',
          html: 'Вікторина на будь-яку тему:) Введіть, будь ласка, бажану тему та натисніть кнопку <b>Розпочати</b>.',
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

export const StartPage = () => {
  const survey = new Model(surveyJson);
  survey.applyTheme(ContrastLight);
  return <Survey model={survey} style={{ height: '100%' }} />;
};
