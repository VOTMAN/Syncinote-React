import React, { createContext, useState, useEffect, ReactNode } from "react"

interface ApiContextType {
  apiKey: string | undefined
  setApiKey: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const ApiContext = createContext<ApiContextType | undefined>(undefined)

interface ApiProviderProps {
  children: ReactNode
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string | undefined>(undefined)

  useEffect(() => {
    const localKey = localStorage.getItem("gemini_api_key")
    if (localKey) setApiKey(localKey)
  }, [])

  return (
    <ApiContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiContext.Provider>
  )
}