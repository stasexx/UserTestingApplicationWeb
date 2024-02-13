import React, { useState } from 'react';

import './App.css';
import { Login } from '../../features/login/Login';
import { TestList } from '../../features/testList/TestList';

const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = (username: string) => {
    setUsername(username);
  };

  return (
    <div className="App">
      {!username ? (
        <Login onLogin={handleLogin} />
      ) : (
        <TestList username={username} />
      )}
    </div>
  );
};

export default App;