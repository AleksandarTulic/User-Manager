import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Role from './routes/Role/Role';
import Header from './components/common/Header/Header';
import Users from './routes/Users/Users';

function App() {
  return (
    <Router>
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <Header />
          <Routes>
              <Route path="/" element={<Role />} />
              <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
