import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import NoMatch from './pages/NoMatch';
import { loadState } from './utils/session';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRestaurant from './pages/admin/AdminRestaurant';

function App() {
  const visitor = loadState();
  const loggedin = (visitor && visitor.state === 'loggedin') ? true : false;
  console.log(loggedin);
  return (
    <>
      <Layout>
        <Router>
          <Routes>
            <Route exact path='/' element={loggedin ? (<HomePage />) : (<Navigate to='/login' />)} />
            <Route exact path='/login' element={<LoginPage />} />
            <Route exact path='/admin/dashboard' element={<AdminDashboard />} />
            <Route exact path='/admin/restaurants' element={<AdminRestaurant />} />
            <Route path='*' element={<NoMatch />} />
          </Routes>
        </Router>
      </Layout>
    </>
  );
}

export default App;
