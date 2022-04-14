import React, { createContext,useState  } from 'react';

export const isAuthenticatedContext = createContext();

const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState()
    const value = {
        user,
        addToUser: (info) => setUser(info),
        logOutUser: () => setUser(),
    }
    console.log(user)

    return (
        <isAuthenticatedContext.Provider value={value}>
            {children}
        </isAuthenticatedContext.Provider>
    );
};

export default AuthContextProvider;

