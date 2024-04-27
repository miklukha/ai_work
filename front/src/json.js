// export const surveyJson = {
//   title: 'Вікторина',
//   showProgressBar: 'bottom',
//   // showTimerPanel: 'top',
//   // maxTimeToFinishPage: 10,
//   // maxTimeToFinish: 30,
//   firstPageIsStarted: true,
//   startSurveyText: 'Почати',
//   pageNextText: 'Далі',
//   pagePrevText: 'Назад',
//   completeText: 'Завершити',
//   completedHtml:
//     'Вітаю, <b> {username} </b> ви закінчили вікторину на тему <b> {query} </b>!',
//   pages: [
//     {
//       elements: [
//         {
//           type: 'html',
//           html: 'Вікторина на будь-яку тему:) <br> Введіть, будь ласка, бажану тему та натисніть кнопку <b>Почати</b>',
//         },
//         {
//           type: 'text',
//           name: 'query',
//           titleLocation: 'hidden',
//           isRequired: true,
//         },
//       ],
//     },
//     {
//       elements: [
//         {
//           type: 'text',
//           name: 'username',
//           title: "Введіть ваше ім'я",
//           isRequired: true,
//         },
//       ],
//     },
//   ],
// };

export const surveyJson = {
  title: 'American History',
  showProgressBar: 'bottom',
  // showTimerPanel: 'top',
  // maxTimeToFinishPage: 10,
  // maxTimeToFinish: 25,
  firstPageIsStarted: true,
  startSurveyText: 'Start Quiz',
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
  ],
  completedHtml:
    '<h4>Ви маєте <b>{correctAnswers}</b> правильних відповідей з <b>{questionCount}</b> запитань.</h4>',
  completedHtmlOnCondition: [
    {
      expression: '{correctAnswers} == 0',
      html: '<h4>На жаль, Всі відповіді неправильні. Спробуйте ще раз.</h4>',
    },
    {
      expression: '{correctAnswers} == {questionCount}',
      html: '<h4>Вітаю! Всі відповіді правильні!</h4>',
    },
  ],
};
