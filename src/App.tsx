import './CSS/App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { DashBoard } from './components/dashboard';
import Login from './components/login';
import Signup from './components/signup';
import { ResetPassword } from './components/resetPassword';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={DashBoard}></Route>
        <Route exact path='/signup' component={Signup}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/passwordreset' component={ResetPassword}></Route>
      </Switch>

    </BrowserRouter>
    
  );
}

export default App;
