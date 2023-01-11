import { useState, createContext } from "react"

const ThemeContext = createContext({
  theme: "light",
  setTheme: (val : string) => {},
})

export default ThemeContext

export function ThemeProvider(props) {
    const [theme, setTheme] = useState(window.localStorage.getItem("themeId") || "light")
    const value = { theme , setTheme }
  
    return (
      <ThemeContext.Provider value={value}>
        {props.children}
      </ThemeContext.Provider>
    )
}