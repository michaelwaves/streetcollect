// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { User, getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, addDoc, setDoc, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA5Du4fpiRgR8sEzI0Q6JVPtBKlri76DcA",
    authDomain: "streetcollect-5582d.firebaseapp.com",
    projectId: "streetcollect-5582d",
    storageBucket: "streetcollect-5582d.appspot.com",
    messagingSenderId: "7473936353",
    appId: "1:7473936353:web:d618f0c4526da9d5f204a0",
    measurementId: "G-8H4MJRLPYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */
const auth = getAuth(app);
const db = getFirestore(app);
const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [signedIn, isSignedIn] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((u) => {
            setUser(u);
            isSignedIn(!!u);
        })
    })
    return { user, signedIn };
}

export { app, auth, db, useAuth };
const provider = new GoogleAuthProvider();

export const handleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
        const u = result.user;
        checkAndAddUsertoFirestore(u);
    }).catch((error) => {
        console.log(error)
    })
}

export const handleSignOut = () => {
    auth.signOut().then(() => {
        console.log("signed out")
    }).catch((error) => {
        console.log(error)
    })
}

export const checkAndAddUsertoFirestore = async (user: any) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
        await setDoc(userRef, {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
        });
    }
}