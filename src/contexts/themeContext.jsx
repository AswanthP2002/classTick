import { createContext, useState } from "react";

export const themeContext = createContext(null)

const ThemeContextProvider = ({children}) => {
    const [theme, setTheme] = useState('light')
    const changeTheme = (theme) => {
        setTheme(theme)
    }
    return <themeContext.Provider value={{theme, changeTheme}}>
        {children}
    </themeContext.Provider>
}

export default ThemeContextProvider