import '../CSS/login.css'

import { auth } from '../firebase'
import Button from 'react-bootstrap/Button'
import { logout, verifyEmail } from '../auth';
import { NavBar } from './navbar';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';



export const DashBoard = () => {
    const [emailVerified, setEmailVerified] = useState(true);

    const history= useHistory();
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
    console.log('currentUser',auth.currentUser);
    
    if(emailVerified){        
        return(
            <>
                <NavBar/>
            </>
        );       
    }

    else{
        return(
            <>
                <div className='card border-4 border-dark'>
                    <div className='card-body '>
                    <p>Your Email is not verified, please verify your email first!</p>
                    <Button variant='secondary' onClick={(e) =>handleVerify(e)}>
                        verify Email
                    </Button>
                    </div>
                </div>
            </>
            
        );
    }
}
