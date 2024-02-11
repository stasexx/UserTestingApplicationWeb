import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite'; // Або 'mobx-react', залежно від того, що ви використовуєте
import { useStore } from '../../app/stores/store';

interface TestListProps {
  username: string;
}

export const TestList: React.FC<TestListProps> = observer(({ username }) => {
  const { testStore, userStore } = useStore();

  useEffect(() => {
    const loadUserAndTests = async () => {
      const user = await userStore.getUser();
      if (user) {
        testStore.loadTests(user.id);
        console.log("HERE");
      }
    };
    loadUserAndTests();
  }, [testStore, userStore]);

  return (
    <div>
      <h2>Available Tests for {username}</h2>
      {testStore.userTests.map((userTest) => (
        <div key={userTest.id}>
          <span>{userTest.name} - {userTest.score}</span>
          {userTest.isCompleted ? (
            <span>✓ Completed !!</span>
          ) : (
            <button>Start Test</button>
          )}
        </div>
      ))}
    </div>
  );
});

export default TestList;