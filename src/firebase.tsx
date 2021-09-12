import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getStorage } from "firebase/storage";
import firebaseConfig from './firebaseConfig';


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
const functions = getFunctions(firebaseApp);
const sendInviteEmails = httpsCallable(functions, 'cf-send-invites');

export { firebaseApp, db, auth, storage, functions, sendInviteEmails }
