import '../../CSS/login.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { signInUser }  from '../../auth';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    let history = useHistory();

    const signIn = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setLoading(true);
        const result = await signInUser(email, password);
        if(result.user){
            setLoading(false);
            history.push('/');
        }
        else if(result.errorCode){
            setLoading(false);
            switch(result.errorCode){
                case 'auth/user-not-found' : setError('Email Id not found. Please SignUp.'); break;
                case 'auth/wrong-password' : setError('Invalid credentials!'); break;
                default : setError('login Failed'); break;
            }
        }
    };

    const handleReset = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        event.preventDefault();
        history.push('/passwordreset');
    }

    const signup = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        event.preventDefault();
        history.push('/signup');
    } 
    
    return (
    <>
        <div className='card border-4 border-dark'>
            <div className='card-body'>
                <Form onSubmit={(e) => signIn(e)}>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Enter email address:</Form.Label>
                    <Form.Control type='email' value={email} placeholder='Enter email' required
                        onChange={(e) => {setEmail(e.target.value)}} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formBasicPassword' >
                    <Form.Label>Enter password:</Form.Label>
                    <Form.Control type='password' value={password} placeholder='Password' required onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <div className= 'login_link'>
                        <p onClick={(e) => handleReset(e)}>
                            Forgot Password?
                        </p>
                    </div>    
                    <Button className='btn btn-dark' type='submit' >
                    Login
                    </Button>
                </Form>
                
                {loading && <div className='spinner-border text-secondary m-3' role='status'/>}
                {error && <p className='error-message mt-2'>{error}</p>}

                <div className='login_link_container'>
                    <p>New User? Please&nbspany;</p>
                    <p className='login_link' onClick={(e) => signup(e)}>signUp</p>
                </div>
            </div>
        </div>
    </>
    );
}

export default Login;
