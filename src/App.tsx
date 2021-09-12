import './CSS/App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { DashBoard } from './components/Pages/dashboard';
import Login from './components/Pages/login';
import Signup from './components/Pages/signup';
import { ResetPassword } from './components/Pages/resetPassword';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/signup' component={Signup}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/passwordreset' component={ResetPassword}></Route>
        <Route path='/' component={DashBoard}></Route>
        
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
