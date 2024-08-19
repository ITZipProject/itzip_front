export interface QuizData {
  _id: string;
  questionText: string;
  difficulty: number;
  category: string;
  answer: number;
  create_date: string;
  modify_date: string;
  acceptedUserCount: number;
  triedUserCount: number;
  points: number;
  create_user_id: string;
  choices: { id: number; choiceText: string }[];
}

export interface MakeQuizData {
  category: string;
  difficulty: string;
  question: string;
  options: string[];
  answer: string;
}
