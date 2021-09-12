import '../../CSS/login.css'

import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { sendInviteEmails } from '../../firebase'


export const SendInvite = () =>{
    const [value, setValue] = useState<string>('');
    const [emails, setEmails] = useState<string[]>([]);
    const [error, setError] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const handleKeyDown = (event:React.KeyboardEvent) => {
        if (['Enter'].includes(event.key)) {
            
            event.preventDefault();  
            var email = value.trim();
            if(email && isEmailValid(email)) {
                console.log(email);
                setEmails([...emails, email])
                setValue('')
            }
        }  
    } 

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, deleteEmail:string) => {
        event.preventDefault();
        setEmails(emails.filter(email => email !== deleteEmail))
    }

    const isEmailValid = (email:string) => {
        let error='';
        if(!email){
            error = 'Email cannot be empty'
        }

        if(!isEmail(email)){
            error = 'not a valid Email'
        }

        if(emails.includes(email)){
            error = 'email address already entered'
        }
        if(error){
            setError(error);
            //setValue('');
            return false;
        }
        return true;
    }

    const handleClick = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if(emails.length>0){
            sendInviteEmails({emails: emails}).then((result) => {
                console.log(result);
                setEmails([]);
                setIsSuccess(true);
            })
            .catch((error) => {
                console.log(error);
                setError('Email could not be sent!')
            })
        }
        else {
            setError('Enter an email Id first !')
        }
    }

    const handleChange = (event:any) => {
        setError(''); 
        setIsSuccess(false);
        setValue(event.target.value)
    }
    const isEmail = (email:string) => {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }
    return(
         <div className='card border-4 border-dark'>
            <div className='card-body'>
            <Form>
                {emails.map(email => (
                <div className='tag-item' key={email}>{email}
                    <button type='button' className='button' onClick={(e) => handleDelete(e,email)}>x</button>
                </div>
                ))}
                <Form.Control className='my-3'
                    placeholder='Type an email addresses and press Enter'
                    value={value}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                {error && <p className='error-message mt-2'>{error}</p>}
                <Button type='submit' 
                    className='btn btn-dark' 
                    onClick={(e) => handleClick(e)}>Send Emails</Button>
            </Form>
            </div>

            
            {isSuccess && <h3 className='success-message ml-2'>Email sent successfully!</h3>}
        </div>
    );
}