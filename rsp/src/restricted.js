import {react, createContext, useContext, useState} from 'react'
export const AuthContext = createContext();

export const Restricted = ({ children }) =>{//even though restricted does not recieve any parameters this is the syntax that createContext uses to 
    
    const [sts, setStatus] = useState(false);
    const [username, setUsername] = useState('');

    return(
        <AuthContext.Provider value={{sts, setStatus , username, setUsername}}>
            {children}
        </AuthContext.Provider>
    )
}


