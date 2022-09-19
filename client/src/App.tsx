import './App.css';
import Header from './components/Header';
import Deposit from './pages/Deposit';
import Play from './pages/Play';
import Account from './pages/Account';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="body">
      <Header />
      <div className="s-parateur"></div>
      <Routes>
        <Route path="/" element={<Deposit />} />
        <Route path="/play" element={<Play />} />
        <Route path="/account" element={<Account />} />
        <Route path="/about" />
      </Routes>
      <Footer />
    </div >
  );
}

export default App;