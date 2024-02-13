import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { UserTest } from '../models/userTest';

export default class TestStore {
  userTests: UserTest[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadTests = async (userId: string) => {
    try {
      const userTests = await agent.Tests.list(userId);
      console.log(userTests)
      runInAction(() => {
        this.userTests = userTests;
      });
    } catch (error) {
      console.error("Failed to load tests", error);
      throw error;
    }
  }

  get completedTests() {
    return this.userTests.filter(userTest => userTest.isCompleted);
  }
}