import '../CSS/login.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { PasswordReset } from '../auth';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';


export const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const history= useHistory();

    const handleSubmit = async(event : any) => {
        event.preventDefault();
        setIsSuccess(false);
        setError('');
        setLoading(true);
        const result = await PasswordReset(email);
        
        if(result.success){
            setLoading(false);
            setIsSuccess(true);
        }

        else if(result.errorCode){
            setLoading(false);
            setIsSuccess(false);
            switch(result.errorCode){
                case 'auth/user-not-found': setError('Email Id is not registered!'); break;
                default: setError(result.errorMessage);
            }
            
        }
    }

    const handleLogin = async(event: any) => {
        event.preventDefault();
        history.push('/login');
    }
    return (
        <div className='card border-4 border-dark'>
            <div className='card-body'>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Enter email address:</Form.Label>
                    <Form.Control type='email' value={email} placeholder='Enter email' required
                        onChange={(e) => {setEmail(e.target.value)}} />
                    </Form.Group>

                    <Button className='btn btn-dark' type='submit'>
                        Send ResetPassword Email.
                    </Button>
                </Form>
                {loading && <div className='spinner-border text-secondary m-3' role='status'/>}
                {error && <p className='error-message mt-2'>{error}</p>}   
                {isSuccess && 
                <p className='info mt-2'>link for password reset has been sent to your Email Id. Please reset your password and&nbsp;
                <span className='login_link' onClick={(e) => handleLogin(e)}>login </span> again.</p>} 
            </div> 
        </div>
    );
}
