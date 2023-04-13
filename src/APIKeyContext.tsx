import React, { createContext, useState } from "react";

const API_KEY_STORAGE_KEY = "openai_api_key";

type APIKeyContextType = {
  apiKey: string | null;
  apiKeyIsValid: boolean;
  saveApiKey: (apiKey: string) => void;
};

export const APIKeyContext = createContext<APIKeyContextType | undefined>(
  undefined
);

interface APIKeyProviderProps extends React.PropsWithChildren<{}> {}

export const APIKeyProvider: React.FC<APIKeyProviderProps> = ({ children }) => {
  const [apiKey, setApiKey] = useState(
    localStorage.getItem(API_KEY_STORAGE_KEY)
  );

  const saveApiKey = (apiKey: string) => {
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
    setApiKey(apiKey);
  };

  const apiKeyIsValid = !!apiKey?.match(/^sk-[a-zA-Z0-9]{48}$/);

  return (
    <APIKeyContext.Provider value={{ apiKey, apiKeyIsValid, saveApiKey }}>
      {children}
    </APIKeyContext.Provider>
  );
};
