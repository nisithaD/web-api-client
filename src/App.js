import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isExpired } from 'react-jwt';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import NoMatch from './pages/NoMatch';
import { isAdmin, isLoggedIn, loadState } from './utils/session';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRestaurant from './pages/admin/AdminRestaurant';
import AdminRestaurantEdit from './pages/admin/AdminRestaurantEdit';
import AdminUsers from './pages/admin/AdminUsers';
import AdminEditUsers from './pages/admin/AdminEditUsers';
import Outlets from './pages/Outlets';
import Cart from './pages/Cart';
import RestaurantsView from './pages/RestaurantsView';
import { toaster } from './utils/alert';


function App() {
  return (
    <>
      <Layout>
        <Router>
          <Routes>
            {/* <Route exact path='/' element={isLoggedIn() ? (<HomePage />) : (<Navigate to='/login' />)} /> */}
            <Route exact path='/' element={AuthCheck(isLoggedIn, (<HomePage />), (<Navigate to='/login' />))} />
            <Route exact path='/login' element={<LoginPage />} />
            <Route exact path='/admin/dashboard' element={AuthCheck(isAdmin, (<AdminDashboard />), (<Navigate to='/login' />))} />
            <Route exact path='/admin/restaurants' element={AuthCheck(isAdmin, (<AdminRestaurant />), (<Navigate to='/login' />))} />
            <Route exact path='/admin/restaurants/edit' element={AuthCheck(isAdmin, (<AdminRestaurantEdit />), (<Navigate to='/login' />))} />
            <Route exact path='/admin/users' element={AuthCheck(isAdmin, (<AdminUsers />), (<Navigate to='/login' />))} />
            <Route exact path='/admin/users/edit' element={AuthCheck(isAdmin, (<AdminEditUsers />), (<Navigate to='/login' />))} />
            <Route exact path='/outlets' element={AuthCheck(isLoggedIn, (<Outlets />), (<Navigate to='/login' />))} />
            <Route exact path='/outlets/view' element={AuthCheck(isLoggedIn, (<RestaurantsView />), (<Navigate to='/login' />))} />
            <Route exact path='/cart' element={AuthCheck(isLoggedIn, (<Cart />), (<Navigate to='/login' />))} />
            <Route path='*' element={<NoMatch />} />
          </Routes>
        </Router>
      </Layout>
    </>
  );
}
const AuthCheck = (type, resolve, reject) => {
  if (loadState() && isExpired(loadState()['token'])) {
    toaster('Session Expired Please login', 'warning')
    return (<Navigate to='/login' />);
  }
  return type() ? resolve : reject;
}


export default App;
