export interface QuizData {
  id: string;
  questionText: string;
  difficulty: number;
  categoryId: number;
  category: string;
  acceptedUserCount: number;
  triedUserCount: number;
  correctRate: number;
  points: number;
  userQuizStatus: string;
  choices: { id: number; choiceText: string }[];
}

export interface MakeQuizData {
  category: string;
  difficulty: string;
  question: string;
  options: string[];
  answer: string;
}
