import './App.css';
import Header from './components/Header';
import Deposit from './pages/Deposit';
import Play from './pages/Play';
import Account from './pages/Account';
import Footer from './components/Footer';
import { Route, Routes, useLocation } from 'react-router-dom';
import About from './pages/userguide/About';
import Faq from './pages/userguide/Faq';
import GettingStarted from './pages/userguide/GettingStarted';
import Governance from './pages/userguide/Governance';
import HeaderUserGuide from './pages/userguide/HeaderUserGuide';

function App() {
  const { pathname } = useLocation();

  return (
    <div className="body">
      {pathname.slice(1, 5) !== 'user' && <Header />}
      {pathname.slice(1, 5) === 'user' && <HeaderUserGuide />}
      <div className="s-parateur"></div>
      <Routes>
        <Route path="/" element={<Deposit />} />
        <Route path="/play" element={<Play />} />
        <Route path="/account" element={<Account />} />
        <Route path="/userguide" >
          <Route path="/userguide/" element={<About />} />
          <Route path="/userguide/faq" element={<Faq />} />
          <Route path="/userguide/gettingstarted" element={<GettingStarted />} />
          <Route path="/userguide/governance" element={<Governance />} />
        </Route>
      </Routes>
      {pathname.slice(1, 5) !== 'user' && <Footer />}

    </div >
  );
}

export default App;