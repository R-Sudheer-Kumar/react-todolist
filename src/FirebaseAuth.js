import { createContext, useContext, useEffect, useInsertionEffect, useState } from "react";
import {auth} from './firebase.utils';
import {  signInWithEmailAndPassword , createUserWithEmailAndPassword, onAuthStateChanged, updateProfile  } from 'firebase/auth';



const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider( {children} )
{
    const [currentUser , setCurrentUser] = useState(null);
    const value={
        currentUser,
        Authlogin,
        signup,
        UpdateUser
    }

    function signup(email , password)
    {
        return createUserWithEmailAndPassword(auth , email , password);
    }

    function Authlogin(email , password)
    {
        return signInWithEmailAndPassword(auth , email , password);
    }

    function UpdateUser(content)
    {
        return updateProfile(currentUser , {displayName:"sudheer"});
    }
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth ,  (user) => {
            setCurrentUser(user);
        });
    
    },[currentUser])
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
