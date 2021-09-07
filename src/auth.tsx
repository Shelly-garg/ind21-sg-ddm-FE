import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  sendEmailVerification } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore'; 
import { auth, db } from './firebase';


export const createUser = async(email:string, password:string, name:string, role:string) => {
  let result= await createUserWithEmailAndPassword(auth, email, password)
  .then( async(userCredential) => {
    const user = userCredential.user;
    try {
        await addDoc(collection(db, 'users'), {
          uid : user.uid, 
          email: user.email, 
          name : name, 
          role: role
        });
        verifyEmail();
        return {
          user,
          errorMessage: null,
          errorCode: null
        }
      } catch (e) {
        return {
          user:null,
          errorMessage:'Unexpected Error',
          errorCode:400,
        }
      }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      user:null,
      errorMessage,
      errorCode,
    }
  });
  return result;
}


export const signInUser = async(email: string, password: string) => {
  let result;
  result = await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    return {
      user,
      errorMessage: null,
      errorCode: null
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      user:null,
      errorMessage,
      errorCode,
    }
  });
  return result;
}


export const PasswordReset = async(email: string) => {
  return await sendPasswordResetEmail(auth, email)
  .then(() => {
    return {
      success: true,
      errorCode: null,
      errorMessage:null
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      success: false,
      errorCode,
      errorMessage
    }
  });
}

export const verifyEmail = () => {
  if(auth.currentUser){
    sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log("email sent successfully")
    });
  }
}

export const logout = () => {
  auth.signOut();
  console.log(auth.currentUser);
}
