import {  Nav, Navbar, } from 'react-bootstrap';
import { Link, Route, Switch,useHistory, } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/action';
import { useEffect } from 'react'

function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const history = useHistory();
  
  const logout = () => {
    fetch('/api/v1/users/logout')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.success);
          dispatch(setUser(null));
          history.push('/');
        }
      });
  };
  useEffect(() => {
    fetch('/api/v1/users/current')
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          dispatch(setUser(data));
        }
      });
  }, [dispatch]);

  return (
    <div className="App">
        <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
        <Navbar.Brand className="ml-5"as={Link} to="/" >Simplicity Game Reviews</Navbar.Brand>
          <Nav className="mr-5" style={{color: 'white'}}>
            {user ? (
              <>
              Signed in as : {user.username}
              <Link className="ml-3" style={{color: 'white'}} onClick={logout} to="/logout">Logout </Link>
              </>
            ) : (
              <>
              <Link className="ml-3" style={{color: 'white'}} to="/login">Login</Link>
              <Link className="ml-3" style={{color: 'white'}} to="/register">Register</Link>
              </>
            )}
          </Nav>
        </Navbar>
        <br />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/game'>
            <Game />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
