import React from 'react';

interface TestListProps {
  username: string;
}

export const TestList: React.FC<TestListProps> = ({ username }) => {
  // Тут буде запит до API за тестами для користувача
  // Припустимо, ви отримали список тестів як `tests`

  return (
    <div>
      <h2>Available Tests for {username}</h2>
      {/* Рендеринг списку тестів */}
    </div>
  );
};