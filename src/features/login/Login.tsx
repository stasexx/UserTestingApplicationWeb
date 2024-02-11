import React, { useState } from 'react';
import { useStore } from '../../app/stores/store';

interface LoginProps {
  onLogin: (name: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setUsername] = useState('');
  const { userStore } = useStore(); // Імпортуємо наш store

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Тепер використовуємо функцію register з userStore
    try {
      await userStore.login({ name });
      onLogin(name); // Якщо реєстрація успішна, виконуємо onLogin
    } catch (error) {
      // Обробка помилок, можливо відображення повідомлення користувачеві
      console.error("Error during registration:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};