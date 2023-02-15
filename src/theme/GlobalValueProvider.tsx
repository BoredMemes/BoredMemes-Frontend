import { useState, createContext } from "react"

const GlobalValueContext = createContext({
  globalDescription: "",
  setGlobalDescription: (val : string) => {},
  isDev: process.env.REACT_APP_NODE_ENV === "development"
})

export default GlobalValueContext

export function GlobalValueProvider(props) {
    const [globalDescription, setGlobalDescription] = useState("")
    const isDev = process.env.REACT_APP_NODE_ENV === "development";
    const value = { globalDescription , setGlobalDescription, isDev }
  
    return (
      <GlobalValueContext.Provider value={value}>
        {props.children}
      </GlobalValueContext.Provider>
    )
}