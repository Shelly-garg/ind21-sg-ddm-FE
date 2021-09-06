import { auth } from '../firebase'
import Button from 'react-bootstrap/Button'
import { verifyEmail } from '../auth';
import { Redirect } from 'react-router-dom';


export const DashBoard = () => {

    const handleClick = (event: any) => {
        event.preventDefault();
        verifyEmail();
    }

    if(!auth.currentUser){
        return(
            <Redirect to='/login'></Redirect>
        )
    }
    
    if(auth.currentUser?.emailVerified){        
        return(
            <h1>Welcome</h1>
        );       
    }

    else{
        return(
            <>
                <h1>Verify Email First</h1>
                <Button variant='secondary' onClick={(e) =>handleClick(e)}>
                    verify Email
                </Button>
            </>
            
        );
    }
}
