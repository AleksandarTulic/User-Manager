import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Role from './routes/Role/Role';
import Header from './components/common/Header/Header';

function App() {
  return (
    <Router>
        <div id='asd123'>
        <Header />
        <div id='um-body'>
          <Routes>
              <Route path="/" element={<Role />} />
          </Routes>
        </div>
        </div>
    </Router>
  );
}

export default App;
