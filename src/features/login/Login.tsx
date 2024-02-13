import React, { useState } from 'react';
import { useStore } from '../../app/stores/store';

interface LoginProps {
  onLogin: (name: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setUsername] = useState('');
  const { userStore } = useStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await userStore.login({ name });
      onLogin(name);
    } catch (error) {
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