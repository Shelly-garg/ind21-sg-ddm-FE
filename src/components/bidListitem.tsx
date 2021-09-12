import '../CSS/login.css'
import { useHistory } from 'react-router-dom';


export const BidListItem = (props: any) =>{

    const history = useHistory();
    return (
        <div className='card border-4 border-dark'>
            <div className='card-body'>
                <h4 className='mt-2'>bidder: {props.bid.bidder}</h4>
                <p className='info'>description: {props.bid.description}</p> 
                <p className='info error-message'>Bid price (INR): {props.bid.price}</p> 
            </div> 
        </div>
    )
} 
