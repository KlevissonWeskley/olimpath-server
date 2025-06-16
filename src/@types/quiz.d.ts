export {} 

declare global {
  var dailyQuiz: {
    date: string;
    quiz: {
      quizTitle: string;
      todayQuizTitle: string;
      description: string;
      questions: {
        id: number;
        question: string;
        options: string[];
        correctAnswer: string;
      }[];
    };
  } | undefined;
}
