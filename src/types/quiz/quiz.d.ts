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

export interface Choice {
  choiceText: string;
}

export interface QuizData {
  questionText: string;
  choices: Choice[];
  category: string;
  difficulty: number;
  id: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SubmitAnswerParams {
  quizId: string;
  answer: number;
  userId: number;
}

export interface SubmitPointParams {
  quizId: string;
  point: number;
  userId: number;
}
