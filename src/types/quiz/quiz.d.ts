export interface QuizData {
  _id: string;
  question_text: string;
  difficulty: number;
  category: string;
  answer: number;
  create_date: string;
  modify_date: string;
  accepted_user_count: number;
  tried_user_count: number;
  points: number;
  create_user_id: string;
  choices: { id: number; choice_text: string }[];
}
