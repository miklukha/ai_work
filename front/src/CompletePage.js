import 'survey-core/defaultV2.min.css';
import { ContrastLight } from 'survey-core/themes/contrast-light';
import { Survey } from 'survey-react-ui';

export const CompletePage = ({ answers, survey, userAnswers }) => {
  survey.applyTheme(ContrastLight);
  survey.data = answers;

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
    let isCorrect = false;

    if (!q) return;

    if (!!userAnswers[q.name]) {
      if (userAnswers[q.name] === q.value) {
        isCorrect = true;
      }
    }

    if (!q.prevTitle) {
      q.prevTitle = q.title;
    }

    if (isCorrect === undefined) {
      q.title = q.prevTitle;
    }

    q.title = q.prevTitle + ' ' + (isCorrect ? correctStr : inCorrectStr);
  };

  survey.onValueChanged.add((sender, options) => {
    console.log('options', options);
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

  survey.getAllQuestions().forEach(q => {
    return renderCorrectAnswer(q);
  });

  return <Survey model={survey} />;
};
