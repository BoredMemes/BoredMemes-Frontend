import { useState, createContext } from "react"

const GlobalValueContext = createContext({
  globalDescription: "",
  setGlobalDescription: (val : string) => {},
})

export default GlobalValueContext

export function GlobalValueProvider(props) {
    const [globalDescription, setGlobalDescription] = useState("")
    const value = { globalDescription , setGlobalDescription }
  
    return (
      <GlobalValueContext.Provider value={value}>
        {props.children}
      </GlobalValueContext.Provider>
    )
}