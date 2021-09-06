import '../CSS/login.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { signInUser }  from '../auth';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history= useHistory();

    const signIn = (event: any) => {
        event.preventDefault();
        let user = signInUser( email, password);
        if(user!== null){
        history.push('/');
        }
    };

    const handleReset =(event: any) => {
        event.preventDefault();
        history.push('/passwordreset');
    }

    const signup = (event: any) => {
        event.preventDefault();
        history.push('/signup');
      } 
    
    return (
    <>
        <Form onSubmit= {(e) => signIn(e)}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Enter email address:</Form.Label>
            <Form.Control type='email' value={email} placeholder='Enter email' required
                onChange={(e) => {setEmail(e.target.value)}} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword' >
            <Form.Label>Enter password:</Form.Label>
            <Form.Control type='password' value={password} placeholder='Password' required onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            
            <Button variant='primary' type='submit' >
            Login
            </Button>
        </Form>
        <div className= 'login_button_container'>
            <Button variant='secondary' onClick={(e) => handleReset(e)}>
                Forgot Password
            </Button>
        </div>

        <div className='login_link_container'>
            <p>New User? please&nbsp;</p>
            <p className='login_link' onClick= {(e) => signup(e)}>SignUp</p>
      </div>
        
    </>
    );
}

export default Login;
