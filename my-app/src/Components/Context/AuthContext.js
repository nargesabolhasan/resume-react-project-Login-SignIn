import React, { createContext,useState  } from 'react';

export const isAuthenticatedContext = createContext();

const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState("")
    const [isSignin, setIsSignin] = useState(false);
    const value = {
        user,
        isSignin,
        addToUser: (info) => setUser(info),
        OpenWelcome:(info) => setIsSignin(info),

    }
    console.log(user)

    return (
        <isAuthenticatedContext.Provider value={value}>
            {children}
        </isAuthenticatedContext.Provider>
    );
};

export default AuthContextProvider;

