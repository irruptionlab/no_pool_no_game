import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Deposit from './pages/Deposit';
import Play from './pages/Play';
import Account from './pages/Account';

function App() {
  const [page, setPage] = useState('deposit');
  return (
    <div className="body">
      <Header page={page} setPage={setPage} />
      <div className="s-parateur"></div>
      {page === 'deposit' && <Deposit />}
      {page === 'play' && <Play />}
      {page === 'account' && < Account />}
    </div>
  );
}

export default App;
