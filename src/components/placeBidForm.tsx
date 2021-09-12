import 'react-datepicker/dist/react-datepicker.css';

import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';



interface propsType{
    requestId: string,
    userId: string
}
export const PlaceBidForm = (props:propsType) => {
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState<FileList | null>(null)
    const [Price, setPrice] = useState<number>(0);
    const [userId, setUserId] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(
            function(user) {
                if(user){
                    setUserId(user.uid);
                } else {
                    setError('user not found');
                }
            }
        ); 
    },[])

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setLoading(true);
        if(files && files.length>6){
            setLoading(false);
            console.log(files);
            setError('upload upto 6 files only!');
            return;
        }
        if(files){
            for(let i = 0; i < files.length; i++) {
                if(files[i].size> 1000001){
                    setLoading(false);
                    setError('file size should not be greater than 1 MB!');
                    return;
                }
              }
        }
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        const user = docSnap.data();
        const data = {
            'description': description,
            'price': Price,
            'bidderId': userId,
            'requestId': props.requestId,
            'bidder' : user?.name, 
        }

        console.log(data);
        await addDoc(collection(db, 'bids'), data);
        if(files){
            await uploadPictures(files);
        }
        else{
            setLoading(false);
            history.push('/');
        }
    }

    const uploadPictures = async(files:FileList) => {
        const storageRef= ref(storage, props.userId+'/'+ props.requestId);
        const promises = [];
        for(let i=0; i<files.length; i++){
            const file = files[i];
            const fileref = ref(storageRef, file.name)
            const Task = uploadBytes(fileref, file);
                promises.push(Task);
        }
        await Promise.all(promises)
        .then(() => {
            console.log('files uploaded successfully!')
            setLoading(false);
            history.push('/');
        })
        .catch(err => console.log(err.code));
    }
    return (
        <>
            <div className='card border-4 border-dark w-50'>
                <div className='card-body'>
                    <Form onSubmit={(e) => handleSubmit(e)}>

                        <Form.Group className='mb-3'>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type='textArea' value={description} placeholder='Description' required
                            onChange={(e) => {setDescription(e.target.value)}} />
                        </Form.Group>


                        <Form.Group className='mb-3'>
                        <Form.Label>Price (INR):</Form.Label>
                        <input type='number' defaultValue={Price} required className='form-control' min='0' 
                                onChange={(e) => setPrice(e.target.valueAsNumber)} />
                        </Form.Group>
                        
                        <Form.Group className='mb-3'>
                            <Form.Label>Upload upto 6 images: &nbsp;</Form.Label>
                            <input type='file' className='form-control-file' accept='.png,.jpg,.jpeg' 
                            multiple id='exampleFormControlFile1' onChange={(e) => setFiles(e.target.files)}/>
                        </Form.Group>
                        
                        <Button className='btn btn-dark mx-auto' type='submit' >
                            Place Bid
                        </Button>
                    </Form>
                    
                    {loading && <div className='spinner-border text-secondary m-3' role='status'/>}
                    {error && <p className='error-message mt-2'>{error}</p>}

                </div>
            </div>
        </>
        );
    }
