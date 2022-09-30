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
import Ethereum from './pages/userguide/Ethereum';
import Optimism from './pages/userguide/Optimism';
import Polygon from './pages/userguide/Polygon';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { useEffect } from 'react';
import GettingOptimism from './pages/userguide/GettingOptimism';
import GettingPolygon from './pages/userguide/GettingPolygon';

function App() {
  const { pathname } = useLocation();
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  useEffect(() => {
    if (chain && (chain.id === 5 || chain.id === 10 || chain.id === 80001)) console.log(`connected to ${chain.name}`)
    else switchNetwork?.(10)
  }, [chain]);

  return (
    <div className="body">
      {pathname.slice(1, 5) !== 'user' && <Header />}
      {pathname.slice(1, 5) === 'user' && <HeaderUserGuide />}
      <div className="s-parateur"></div>
      <Routes>
        <Route path="/" element={<Deposit />} />
        {/* <Route path="/play" element={<Play />} />
        <Route path="/account" element={<Account />} />
        <Route path="/userguide" >
          <Route path="/userguide" element={<About />} />
          <Route path="/userguide/faq" element={<Faq />} />
          <Route path="/userguide/gettingstarted" element={<GettingStarted />} />
          <Route path="/userguide/governance" element={<Governance />} />
          <Route path="/userguide/network">
            <Route path="/userguide/network" element={<Ethereum />} />
            <Route path="/userguide/network/optimism/">
              <Route path="/userguide/network/optimism/" element={<Optimism />} />
              <Route path="/userguide/network/optimism/getting" element={<GettingOptimism />} />
            </Route>
            <Route path="/userguide/network/polygon">
              <Route path="/userguide/network/polygon" element={<Polygon />} />
              <Route path="/userguide/network/polygon/getting" element={<GettingPolygon />} />
            </Route>
          </Route> */}
        {/* </Route> */}
      </Routes>
      {pathname.slice(1, 5) !== 'user' && <Footer />}
    </div >
  );
}

export default App;