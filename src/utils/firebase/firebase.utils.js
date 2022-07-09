import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithRedirect, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, getDoc, setDoc, doc, collection } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAnqA4V_QCP9zQZ0yeXmUC-p5xPb0Bf50k",
    authDomain: "ecommerce-react-295f7.firebaseapp.com",
    projectId: "ecommerce-react-295f7",
    storageBucket: "ecommerce-react-295f7.appspot.com",
    messagingSenderId: "625138378690",
    appId: "1:625138378690:web:c41f126af7fd1420de985b"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    // fetch user
    const userSnapshot = await getDoc(userDocRef);
    
    // If user does not exist
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        } catch(error) {
            console.log("error creating user, ", error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = (email, password) => {
    if (!email && !password) return;
    return createUserWithEmailAndPassword(auth, email, password);
}
