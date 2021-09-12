import { useHistory } from 'react-router-dom';


export const MarketPlaceItem = (props: any) =>{
    const history = useHistory();
    const handleClick = (event:any) => {
        event.preventDefault();
        history.push('/request/'+props.id);
    }

    return (
        <div className='card border-4 border-dark' onClick={(e)=> handleClick(e)}>
            <div className='card-body'>
                <h4 className='mt-2'>{props.item.name}</h4>
                <h5 className='info'>Request created by: {props.item.requester}</h5> 
                <p className='info'>{props.item.description}</p> 
            </div> 
        </div>
    )
} 
