import '../CSS/login.css'

import { auth } from '../firebase';
import Button from 'react-bootstrap/Button';
import { createUser }  from '../auth';
import Form from 'react-bootstrap/Form'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';


const Signup = () =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history= useHistory();

  const register = (event: any) => {
    event.preventDefault();
    createUser( email, password);
    if(auth.currentUser){
      history.push('/');
    }
  };

  const login = (event: any) => {
    event.preventDefault();
    history.push('/login');
  } 

  return (
    <>
      <Form onSubmit= {(e) => register(e)}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Enter email address:</Form.Label>
          <Form.Control type='email' value={email} placeholder='Enter email' required
              onChange={(e) => {setEmail(e.target.value)}} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword' >
          <Form.Label>Enter password:</Form.Label>
          <Form.Control type='password' value={password} required minLength={6} maxLength={20}
          placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        
        <Button variant='primary' type='submit'>
          Sign-up
        </Button>
      </Form>
      <div className='login_link_container'>
        <p>If you already have an account, please &nbsp;</p>
        <p className='login_link' onClick= {(e) => login(e)}> Login</p>
      </div>
    </>

  );
}

export default Signup;
