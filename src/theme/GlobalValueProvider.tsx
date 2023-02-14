import { useState, createContext } from "react"

const GlobalValueContext = createContext({
  globalDescription: "",
  setGlobalDescription: (val : string) => {},
  isDev: process.env.NODE_ENV === "development"
})

export default GlobalValueContext

export function GlobalValueProvider(props) {
    const [globalDescription, setGlobalDescription] = useState("")
    const isDev = process.env.NODE_ENV === "development";
    console.log("Current Environment : " + process.env.NODE_ENV);
    const value = { globalDescription , setGlobalDescription, isDev }
  
    return (
      <GlobalValueContext.Provider value={value}>
        {props.children}
      </GlobalValueContext.Provider>
    )
}