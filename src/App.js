import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import NoMatch from './pages/NoMatch';
import { loadState } from './utils/session';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRestaurant from './pages/admin/AdminRestaurant';
import AdminRestaurantEdit from './pages/admin/AdminRestaurantEdit';
import AdminUsers from './pages/admin/AdminUsers';
import AdminEditUsers from './pages/admin/AdminEditUsers';

function App() {
  const visitor = loadState();
  const loggedin = (visitor && visitor.state === 'loggedin') ? true : false;
  console.log('logged in: ' + loggedin);
  return (
    <>
      <Layout>
        <Router>
          <Routes>
            <Route exact path='/' element={loggedin ? (<HomePage />) : (<Navigate to='/login' />)} />
            <Route exact path='/login' element={<LoginPage />} />
            <Route exact path='/admin/dashboard' element={<AdminDashboard />} />
            <Route exact path='/admin/restaurants' element={<AdminRestaurant />} />
            <Route exact path='/admin/restaurants/edit' element={<AdminRestaurantEdit />} />
            <Route exact path='/admin/users' element={<AdminUsers />} />
            <Route exact path='/admin/users/edit' element={<AdminEditUsers />} />
            <Route path='*' element={<NoMatch />} />
          </Routes>
        </Router>
      </Layout>
    </>
  );
}

export default App;
