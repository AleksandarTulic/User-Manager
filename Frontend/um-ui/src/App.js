import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Role from './routes/Role/Role';
import Header from './components/common/Header/Header';
import Users from './routes/Users/Users';
import Home from './routes/Home/Home';
import ResultModal from './components/common/ResultModal/ResultModal';
import { MyContextProvider } from './MyContext';

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div>
          <MyContextProvider>
            <ResultModal />
            <Header />
            <Routes>
                <Route path="/roles" element={<Role />} />
                <Route path="/users" element={<Users />} />
                <Route path="/" element={<Home />} />
            </Routes>
          </MyContextProvider>
        </div>
      </div>
    </Router>
  );
}

export default App;
