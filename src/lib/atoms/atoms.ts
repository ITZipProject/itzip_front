import { atom } from 'jotai';
import { QuizData } from '../../types/quiz/quiz';

export const quizzesAtom = atom<QuizData[]>([]);
