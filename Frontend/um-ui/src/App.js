import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Role from './routes/Role/Role';
import Header from './components/common/Header/Header';
import Users from './routes/Users/Users';
import Home from './routes/Home/Home';
import ResultModal from './components/common/ResultModal/ResultModal';
import { MyContextProvider } from './MyContext';
import AccessControlTest from './routes/AccessControlTest/AccessControlTest';
import Footer from './components/common/Footer/Footer';
import LoginModal from './components/LoginModal/LoginModal';

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div>
          <MyContextProvider>
            <ResultModal />
            <LoginModal />
            <Header />
            <Routes>
                <Route path="/roles" element={<Role />} />
                <Route path="/users" element={<Users />} />
                <Route path="/access-control-test" element={<AccessControlTest />} />
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
          </MyContextProvider>
        </div>
      </div>
    </Router>
  );
}

export default App;
