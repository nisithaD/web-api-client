import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'; 

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';

function App() {
  return (
   <>
   <Layout>
    <Router>
      <Routes>
        <Route exact path='/' element={<HomePage />}/>
        <Route exact path='/login' element={<LoginPage />}/>
      </Routes>
    </Router>
    </Layout>
   </>
  );
}

export default App;
