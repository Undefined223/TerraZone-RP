import React, { createContext, useContext, useEffect, useState } from "react";

const TerrazoneContext = createContext();

const TerraZoneProvider = ({ children }) => {
    const [user, setUser] = useState();


    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TerrazoneContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </TerrazoneContext.Provider>
    );
};

export const TerraState = () => {
    return useContext(TerrazoneContext);
};

export default TerraZoneProvider;
