import { use, useContext, useState, useEffect } from "react";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, query, where } from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    }

    const signinUserWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    }

    const signInWithGoogle = () => {
        return signInWithPopup(firebaseAuth, googleProvider);
    }

    const signOutUser = async () => {
        await signOut(firebaseAuth);
        return true;
    }

    const handleCreateNewListing = async (name, isbnNumber, price, coverPic) => {
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

        const formData = new FormData();
        formData.append('file', coverPic);
        formData.append('upload_preset', uploadPreset);
        formData.append('cloud_name', cloudName);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        return await addDoc(collection(firestore, 'books'), {
            name,
            isbnNumber,
            price,
            imageURL: result.secure_url,
            userId: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        })
    }

    const listAllBooks = async () => {
        return await getDocs(collection(firestore, "books"));
    }

    const getBookById = async (id) => {
        const docRef = doc(firestore, "books", id);
        const result = await getDoc(docRef);
        return result;
    }

    const getImageURL = async (image) => {
        if (!image) return null;
        if (typeof image === 'string') {
            const trimmed = image.trim();
            if (trimmed.startsWith('http') || trimmed.startsWith('data:') || trimmed.startsWith('/')) {
                return trimmed;
            }
        }
        return null;
    }

    const placeOrder = async (bookId, qty) => {
        const collectionRef = collection(firestore, "books", bookId, "orders")
        const result = await addDoc(collectionRef, {
            userId: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            qty: Number(qty),
        })
        return result;
    };

    const fetchMyBooks = async (userId) => {
        const collectionRef = collection(firestore, "books");
        const q = query(collectionRef, where("userId", "==", userId));
        const result = await getDocs(q);
        return result;
    }

    const getOrders = async (bookId) => {
        const collectionRef = collection(firestore, "books", bookId, "orders")
        const result = await getDocs(collectionRef);
        return result;
    }

    const isLoggedIn = user ? true : false;

    return (
        <FirebaseContext.Provider value={{
            signupUserWithEmailAndPassword,
            signinUserWithEmailAndPassword,
            signInWithGoogle,
            signOutUser,
            handleCreateNewListing,
            listAllBooks,
            getImageURL,
            getBookById,
            placeOrder,
            fetchMyBooks,
            getOrders,
            isLoggedIn,
            user,
        }
        }>
            {props.children}
        </FirebaseContext.Provider>
    )
}