import '../CSS/login.css'


import Button from 'react-bootstrap/Button';
import { createUser }  from '../auth';
import Form from 'react-bootstrap/Form'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';


const Signup = () =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  let history= useHistory();

  const register = async(event: any) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    if(!role){
      setLoading(false);
      setError('Please select a Role!');
      return;
    }

    if(password !== confirmPassword){
      setLoading(false);
      setPassword('');
      setConfirmPassword('');
      setError('Confirm Password donot match!');
      return;
    }

    const result = await createUser( email, password, name, role);
    console.log(result);
    if(result.user){
      setLoading(false);
      history.push('/');
    }
    else if(result.errorCode){
      setLoading(false);
      switch(result.errorCode){
        case 'auth/email-already-in-use' : setError('Email id already exist! please Login'); break;
        default : setError('SignUp failed'); break;
      }
      
    }
  };

  const login = (event: any) => {
    event.preventDefault();
    history.push('/login');
  } 

  return (
    <>
     <div className='card border-4 border-dark'>
        <div className='card-body'>
          <Form onSubmit= {(e) => register(e)}>
            <Form.Group className='mb-3' >
              <Form.Label>Enter Full name:</Form.Label>
              <Form.Control type='text' value={name} placeholder='Enter name' required
                  onChange={(e) => {setName(e.target.value)}} />
            </Form.Group>

            <Form.Group className='mb-3' >
            <Form.Label >Choose your role: &nbsp; </Form.Label>
              <div className='col-auto my-1 .w-25'>
                <select className='custom-select mr-sm-2' defaultValue=''
                        onChange={(e) => {setRole(e.target.value); console.log(role)}}>
                  <option value=''>select...</option>
                  <option value='Buyer'>Buyer</option>
                  <option value='Seller'>Seller</option>
                </select>
              </div>
            </Form.Group>

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
            
            <Form.Group className='mb-3' controlId='formBasicPassword2' >
              <Form.Label>Confirm password:</Form.Label>
              <Form.Control type='password' value={confirmPassword} required minLength={6} maxLength={20}
              placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)}/>
            </Form.Group>

            <Button className="btn btn-dark" type='submit'>
              Sign-up
            </Button>
          </Form>

          {loading && <div className='spinner-border text-secondary m-3' role='status'/>}
          {error && <p className='error-message mt-2'>{error}</p>}

          <div className='login_link_container'>
            <p>If you already have an account, please &nbsp;</p>
            <p className='login_link' onClick= {(e) => login(e)}> Login</p>
          </div>
        </div>  
      </div>
    </>

  );
}

export default Signup;
