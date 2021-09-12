import 'react-datepicker/dist/react-datepicker.css';

import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker'
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


export const ItemRequest = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [itemStatus, setItemStatus] = useState('');
    const [closingtime, setClosingTime] = useState<Date>();
    const [notOldThan, setNotOldThan] = useState<any>(0);
    const [numberOfItems, setNumberOfItems] = useState<any>(1);
    const [maxPrice, setMaxPrice] = useState<any>(100);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState('');
    const history = useHistory();
    var min_date = new Date();
    min_date.setDate(min_date.getDate() + 2);

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
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        const user = docSnap.data();
        const data = {
            'name': name,
            'description': description,
            'item_status':  itemStatus,
            'not_older_than': notOldThan,
            'number_of_items': numberOfItems,
            'max_price': maxPrice,
            'requester': user?.name,
            'is_active' : true,
            'closing_time': closingtime,
            userId,
        }
        await addDoc(collection(db, 'requests'), data);
        setLoading(false);
        history.push('/');
    }
    return (
        <>
            <div className='card border-4 border-dark w-50'>
                <div className='card-body'>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group className='mb-3'>
                        <Form.Label>Name Of Item:</Form.Label>
                        <Form.Control type='text' value={name} placeholder='Enter name' required
                            onChange={(e) => {setName(e.target.value)}} />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type='textArea' value={description} placeholder='Description' required
                            onChange={(e) => {setDescription(e.target.value)}} />
                        </Form.Group>

                        <Form.Group className='mb-3' >
                        <Form.Label >Choose Item Status: &nbsp; </Form.Label>
                        <div className='col-auto my-1 .w-25'>
                            <select className='form-control mr-sm-2' required defaultValue=''
                                    onChange={(e) => {setItemStatus(e.target.value)}}>
                            <option value=''>select...</option>
                            <option value='new '>new</option>
                            <option value='pre-owned'>pre-owned</option>
                            <option value='refurbished'>refurbhished</option>
                            </select>
                        </div>
                        </Form.Group>

                        {(itemStatus==='pre-owned'||itemStatus==='refurbished')&&
                            <Form.Group className='mb-3'>
                            <Form.Label>Item should not be older than (in Months):</Form.Label>
                            <input type='number' required defaultValue={notOldThan} className='form-control' min='0' step='1'
                            onChange={(e) => setNotOldThan(e.target.value)}/>
                            </Form.Group> }

                        <Form.Group className='mb-3'>
                        <Form.Label>Number of Items:</Form.Label>
                        <input type='number' defaultValue={numberOfItems} 
                        className='form-control' min='1' step='1'
                        onChange={(e) => setNumberOfItems(e.target.value)}
                        />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                        <Form.Label>Max Price (INR):</Form.Label>
                        <input type='number' defaultValue={maxPrice} required 
                        className='form-control' min='100' 
                        onChange={(e) => setMaxPrice(e.target.value)} />
                        </Form.Group>
                        
                        <Form.Group className='mb-3'>
                            <Form.Label>Bid Closing Time:</Form.Label>
                            <div>
                                <DatePicker
                                    onChange={(date:any) => {setClosingTime(date); console.log(date)}}
                                    selected={closingtime}
                                    showTimeSelect
                                    required
                                    timeFormat='HH:mm'
                                    timeIntervals={60}
                                    dateFormat='MMMM d, yyyy h:mm aa'
                                    timeCaption='time'
                                    minDate={min_date}
                                    placeholderText='minimum time should be 48 hrs'
                                />
                            </div>
                        </Form.Group>

                        <Button className='btn btn-dark mx-auto' type='submit' >
                            Post Request
                        </Button>
                    </Form>                    
                    {loading && <div className='spinner-border text-secondary m-3' role='status'/>}
                    {error && <p className='error-message mt-2'>{error}</p>}
                </div>
            </div>
        </>
        );
    }
