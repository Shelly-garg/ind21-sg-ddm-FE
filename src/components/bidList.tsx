import { auth, db } from '../firebase';
import { BidListItem } from './bidListitem';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getUserRole } from '../services/RoleStorage';
import { useEffect } from 'react'
import { useState } from 'react'


interface propType{
requestId : string
}

export const BidList = (props:propType) => {

    const [bidsList, setBidsList] = useState<any>([]);
    const role = getUserRole();
    const requestId = props.requestId;

    const getAllBids = async(userId:string) => {
        
        const q = query(collection(db, 'bids'), where('requestId', '==', requestId));
        const querySnapshot = await getDocs(q);
        let list:any;
        list=[];
        querySnapshot.forEach((doc) => {
            list.push(<BidListItem id={doc.id} key={doc.id} bid={doc.data()}></BidListItem>);
        });
        setBidsList(list);
        
    }
    useEffect(() => {
        auth.onAuthStateChanged(
            function(user) {
                if(user){
                    getAllBids(user.uid);
                } else {
                }
            }
        ); 
    },[])

    return (
        <div>
            {bidsList}
        </div>

    )
}
