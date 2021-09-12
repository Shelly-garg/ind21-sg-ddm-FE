import { auth, db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getUserRole } from '../../services/RoleStorage';
import { MarketPlaceItem } from '../marketPlaceItem';
import { useState } from 'react'
import { useEffect } from 'react'


export const MarketPlace = () => {

    const [requestList, setRequestList] = useState<any>([]);
    const role = getUserRole();
    const getAllRequests = async(userId:string) => {
        
        if(role=='Seller')
        {
            const q = query(collection(db, 'requests'), where('is_active', '==', true));
            const querySnapshot = await getDocs(q);
            let list:any;
            list=[];
            querySnapshot.forEach((doc) => {
                list.push(<MarketPlaceItem id={doc.id} key={doc.id} item={doc.data()}></MarketPlaceItem>);
            });
            setRequestList(list);
        }
        
        else{
            const q = query(collection(db, 'requests'), where('userId', '==', userId));
            const querySnapshot = await getDocs(q);
            let list:any;
            list=[];
            querySnapshot.forEach((doc) => {
                list.push(<MarketPlaceItem id={doc.id} key={doc.id} item={doc.data()}></MarketPlaceItem>);
            });
            setRequestList(list);
        }
        
        
    }
    useEffect(() => {
        auth.onAuthStateChanged(
            function(user) {
                if(user){
                    getAllRequests(user.uid);
                } else {
                }
            }
        ); 
    },[])

    return (
        <div>
            {requestList}
        </div>

    )
}
