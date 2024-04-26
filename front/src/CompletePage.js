import { Model } from 'survey-core';
import 'survey-core/defaultV2.min.css';
import { ContrastLight } from 'survey-core/themes/contrast-light';
import { Survey } from 'survey-react-ui';
import { surveyJson } from './json';

export const CompletePage = () => {
  const survey = new Model(surveyJson);
  survey.applyTheme(ContrastLight);

  survey.data = {
    civilwar: '1861-1865',
    libertyordeath: 'Samuel Adams',
    magnacarta: 'The foundation of the British parliamentary system',
  };

  survey.mode = 'display';
  survey.questionsOnPageMode = 'singlePage';
  survey.showNavigationButtons = 'none';
  survey.showProgressBar = 'off';
  survey.showTimerPanel = 'none';
  survey.maxTimeToFinishPage = 0;
  survey.maxTimeToFinish = 0;
  const correctStr = 'Правильно';
  const inCorrectStr = 'Неправильно';

  const getTextHtml = (text, str, isCorrect) => {
    if (text.indexOf(str) < 0) return undefined;
    return (
      text.substring(0, text.indexOf(str)) +
      "<span class='" +
      (isCorrect ? 'correctAnswer' : 'incorrectAnswer') +
      "'>" +
      str +
      '</span>'
    );
  };

  const renderCorrectAnswer = q => {
    if (!q) return;

    const isCorrect = q.isAnswerCorrect();
    console.log(isCorrect);

    if (!q.prevTitle) {
      q.prevTitle = q.title;
    }
    if (isCorrect === undefined) {
      q.title = q.prevTitle;
    }

    q.title = q.prevTitle + ' ' + (isCorrect ? correctStr : inCorrectStr);
  };

  survey.onValueChanged.add((sender, options) => {
    renderCorrectAnswer(options.question);
  });

  survey.onTextMarkdown.add((sender, options) => {
    const text = options.text;
    let html = getTextHtml(text, correctStr, true);

    if (!html) {
      html = getTextHtml(text, inCorrectStr, false);
    }
    if (!!html) {
      options.html = html;
    }
  });

  survey.getAllQuestions().forEach(q => renderCorrectAnswer(q));

  return <Survey model={survey} />;
};
