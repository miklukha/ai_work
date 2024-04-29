import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { ContrastLight } from 'survey-core/themes/contrast-light';
import { useState } from 'react';
import { CompletePage } from './CompletePage';

export const SurveyPage = ({ answers, data }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [userAnswersH, setUserAnswersH] = useState({});
  const userAnswers = {};
  const survey = new Model(data);

  survey.applyTheme(ContrastLight);

  survey.onComplete.add(() => {
    setUserAnswersH(userAnswers);
    setIsComplete(true);
  });

  survey.onValueChanged.add((sender, options) => {
    userAnswers[options.name] = options.value;
  });

  return !isComplete ? (
    <Survey model={survey} style={{ height: '100%' }} />
  ) : (
    <CompletePage
      answers={answers}
      survey={survey}
      userAnswers={userAnswersH}
    />
  );
};
