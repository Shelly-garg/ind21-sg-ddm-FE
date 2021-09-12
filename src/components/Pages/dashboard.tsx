import '../../CSS/login.css'

import { auth } from '../../firebase'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { getUserRole } from '../../services/RoleStorage';
import { ItemRequest } from './itemRequest';
import { MarketPlace } from './MarketPlace';
import { NavBar } from '../navbar';
import { RequestInfo } from './requestInfo';
import { SendInvite } from './sendInvite';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { verifyEmail } from '../../auth';


export const DashBoard = () => {
    const [emailVerified, setEmailVerified] = useState(true);
    const userRole = getUserRole();
    const history = useHistory();
    useEffect(() => {
        auth.onAuthStateChanged(
            function(user) {
                if(user){
                    setEmailVerified(user.emailVerified);
                } else {
                    history.push('/login');
                }
            }
          ); 
    },[])
    const handleVerify = (event: any) => {
        event.preventDefault();
        verifyEmail();
    }
    
    if(emailVerified){        
        return(
            <>
            <BrowserRouter>
                <NavBar/>
                <Switch>
                <Route exact path='/postrequest' component={ItemRequest}></Route>
                <Route exact path='/market' component={MarketPlace}></Route>
                <Route exact path='/request/:id' component={RequestInfo}></Route>
                <Route exact path='/invite' component={SendInvite}></Route>
                </Switch>
            </BrowserRouter>
            <h1>welcome</h1>
            </>
        );       
    }

    else{
        return(
            <>
                <div className='card border-4 border-dark'>
                    <div className='card-body '>
                    <p>Your Email is not verified, please verify your email first!</p>
                    <Button variant='secondary' onClick={(e) => handleVerify(e)}>
                        verify Email
                    </Button>
                    </div>
                </div>
            </>
        );
    }
}
