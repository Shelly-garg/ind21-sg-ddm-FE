import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { PasswordReset } from '../auth';
import { useState } from 'react';


export const ResetPassword = () => {
    const [email, setEmail] = useState('');
    
    const handleSubmit = (event : any) => {
        event.preventDefault();
        PasswordReset(email);
    }
    return (
        <Form onSubmit= {(e) => handleSubmit(e)}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Enter email address:</Form.Label>
            <Form.Control type='email' value={email} placeholder='Enter email' required
                onChange={(e) => {setEmail(e.target.value)}} />
            </Form.Group>
            <Button variant='primary' type='submit'>
                Send ResetPassword Email.
            </Button>
        </Form>
    );
}
