import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import NoMatch from './pages/NoMatch';
import { isAdmin, isLoggedIn } from './utils/session';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRestaurant from './pages/admin/AdminRestaurant';
import AdminRestaurantEdit from './pages/admin/AdminRestaurantEdit';
import AdminUsers from './pages/admin/AdminUsers';
import AdminEditUsers from './pages/admin/AdminEditUsers';

function App() {
  console.log(isAdmin());
  return (
    <>
      <Layout>
        <Router>
          <Routes>
            <Route exact path='/' element={isLoggedIn() ? (<HomePage />) : (<Navigate to='/login' />)} />
            <Route exact path='/login' element={<LoginPage />} />
            <Route exact path='/admin/dashboard' element={isAdmin() ? (<AdminDashboard />) : (<Navigate to='/login' />)} />
            <Route exact path='/admin/restaurants' element={isAdmin() ? (<AdminRestaurant />) : (<Navigate to='/login' />)} />
            <Route exact path='/admin/restaurants/edit' element={isAdmin() ? (<AdminRestaurantEdit />) : (<Navigate to='/login' />)} />
            <Route exact path='/admin/users' element={isAdmin() ? (<AdminUsers />) : (<Navigate to='/login' />)} />
            <Route exact path='/admin/users/edit' element={isAdmin() ? (<AdminEditUsers />) : (<Navigate to='/login' />)} />
            <Route path='*' element={<NoMatch />} />
          </Routes>
        </Router>
      </Layout>
    </>
  );
}

export default App;
