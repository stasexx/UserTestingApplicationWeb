// TestList.tsx
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';// Припускаємо, що у вас є компонент для відображення питань
import QuestionList from '../question/QuestionList';

interface TestListProps {
  username: string;
}

export const TestList: React.FC<TestListProps> = observer(({ username }) => {
  const { testStore, userStore } = useStore();
  const [activeTestId, setActiveTestId] = useState<string | null>(null);
  const [refreshTests, setRefreshTests] = useState(false);

  const handleStartTest = (testId: string) => {
    setActiveTestId(testId);
  };

  const handleBack = () => {
    setActiveTestId(null);
    setRefreshTests(prev => !prev);
  };

  useEffect(() => {
    const loadUserAndTests = async () => {
      const user = await userStore.getUser();
      if (user) {
        testStore.loadTests(user.id);
      }
    };
    loadUserAndTests();
  }, [testStore, userStore, refreshTests]);

  return (
    <div>
      {activeTestId ? (
        <QuestionList testId={activeTestId} onBack={handleBack} />
      ) : (
        <div>
          <h2>Available Tests for {username}</h2>
          {testStore.userTests.map((userTest) => (
            <div key={userTest.id}>
              <span>{userTest.name} - {userTest.score}</span>
              {userTest.isCompleted ? (
                <span>✓ Completed</span>
              ) : (
                <button onClick={() => handleStartTest(userTest.id)}>Start Test</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default TestList;