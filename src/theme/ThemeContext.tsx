import { useState, createContext } from "react"

const ThemeContext = createContext({
  theme: "dark",
  setTheme: (val : string) => {},
})

export default ThemeContext

export function ThemeProvider(props) {
    const [theme, setTheme] = useState(window.localStorage.getItem("themeId") || "dark")
    const value = { theme , setTheme }
  
    return (
      <ThemeContext.Provider value={value}>
        {props.children}
      </ThemeContext.Provider>
    )
}