import { Link, BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/auth.context';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/layout/Dashboard';
import AddContacts from './components/layout/AddContacts';
import PrivateRoute from './routing/PrivateRoutes';
import setAuthToken from './utils/setAuthToken';
import "./App.css"
import Favorites from './components/layout/Favorites';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element=<Landing/> />
          <Route exact path='/login' element=<Login/> />
          <Route exact path='/register' element=<Register/> />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
            />
          <Route
            path="/add"
            element={<PrivateRoute component={AddContacts} />}
            />
            <Route
            path="/favorites"
            element={<PrivateRoute component={Favorites} />}
            />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
