import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  sendEmailVerification } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore'; 
import { auth, db } from './firebase';


export const createUser = (email:string, password:string) =>{
  createUserWithEmailAndPassword(auth, email, password)
    .then( async(userCredential) => {
      const user = userCredential.user;
      try {
          const docRef = await addDoc(collection(db, 'users'), {
            uid : user.uid, 
            email: user.email, 
            name : 'user1', 
            born: 1815
          });
          verifyEmail();
          return user;
        } catch (e) {
          return e;
        }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage;
    });
}


export const signInUser = (email: string, password: string) =>{
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    return user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return errorMessage;
  });
}


export const PasswordReset = (email: string) => {
  sendPasswordResetEmail(auth, email)
  .then(() => {
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return errorMessage;
  });
}

export const verifyEmail = () => {
  if(auth.currentUser){
    sendEmailVerification(auth.currentUser)
    .then(() => {
    });
  }
}
