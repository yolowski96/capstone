import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA-wo4uOdO7Zd1D2V_cVB8JRVJuJnoMnXY",
    authDomain: "capstone-c1466.firebaseapp.com",
    projectId: "capstone-c1466",
    storageBucket: "capstone-c1466.appspot.com",
    messagingSenderId: "668183553889",
    appId: "1:668183553889:web:fbbc39ae774590b6b50720"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt });
        } catch (error){
            console.log('error creating the user', error.meessage);
        }
    }

    return userDocRef;
}

