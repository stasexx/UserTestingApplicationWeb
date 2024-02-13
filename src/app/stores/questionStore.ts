import { makeAutoObservable, runInAction } from 'mobx';
import { QuestionOption } from '../models/question';
import agent from '../api/agent';

export default class QuestionStore {
  questionsWithOptions: QuestionOption[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadQuestionsWithOptions = async (testId: string) => {
    try {
      const questionsWithOptions = await agent.Questions.list(testId);
      console.log(questionsWithOptions)
      runInAction(() => {
        this.questionsWithOptions = questionsWithOptions;
        console.log(this.questionsWithOptions.values)
      });
      
    } catch (error) {
      console.error("Failed to load questions and options", error);
      throw error;
    }
  }

  submitTestResults = async (testId: string, userId: string, score: number) => {
    try {
      await agent.Testing.submit(testId, userId, score);
      runInAction(() => {
        console.log("Test results submitted successfully.");
      });
    } catch (error) {
      console.error("Failed to submit test results", error);
    }
  };
}
