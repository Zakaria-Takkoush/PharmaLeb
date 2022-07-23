import React, { useState } from "react";

export const FavoritesContext = React.createContext();

const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                setFavorites,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesProvider;
