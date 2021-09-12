import { auth, db } from '../../firebase';
import { BidList } from '../bidList';
import {doc, getDoc} from 'firebase/firestore';
import { getUserRole } from '../../services/RoleStorage';
import { MarketPlaceItem } from '../marketPlaceItem';
import { PlaceBidForm } from '../placeBidForm';
import { useEffect, useState } from 'react';


export const RequestInfo = (props:any) =>{
    const requestId = props.match.params.id;
    const[item, setItem] = useState<any>();
    const[userId, setUserId] = useState<string>('');
    const role = getUserRole();
    const getRequest = async() =>{
        const docRef = doc(db, 'requests', requestId);
        const docSnap = await getDoc(docRef);
        setItem(docSnap.data())
    }
    useEffect(()=>{
        auth.onAuthStateChanged(
            function(user) {
                if(user){
                  setUserId(user.uid);
                } else {
                }
            }
        ); 
        getRequest();
    },[])
   
    return(
        <>
           {item && 
           <div>
               <MarketPlaceItem id={requestId} item={item}></MarketPlaceItem>
               {role=='Seller' && 
               <PlaceBidForm requestId={requestId} userId={userId}></PlaceBidForm>}
               {role=='Buyer' && 
                <div>
                    <h1 className='align-items-center mx-auto mt-2'>Bids made on this request:</h1>
                    <BidList requestId={requestId} ></BidList>
                </div>}
            </div>}           
        </>
    )
}
