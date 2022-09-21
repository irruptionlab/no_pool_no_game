import './App.css';
// import './webflow.css'
import Header from './components/Header';
import Deposit from './pages/Deposit';
import Play from './pages/Play';
import Account from './pages/Account';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Memory from './components/Memory';

function App() {

  return (
    <div className="body">
      <Header />
      <div className="s-parateur"></div>
      <Routes>
        <Route path="/" element={<Deposit />} />
        <Route path="/play" element={<Play />} />
        <Route path="/account" element={<Account />} />
        <Route path="/test" element={<Memory />} />

      </Routes>
      <Footer />
    </div >
  );
}

export default App;