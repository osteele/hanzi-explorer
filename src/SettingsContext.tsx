import React, { createContext, useState } from "react";

const SETTINGS_STORAGE_KEY = "settings";

export type Settings = {
  interests: string[];
};

function loadSettings() {
  const json = localStorage.getItem(SETTINGS_STORAGE_KEY);
  return {
    interests: [],
    ...(json ? JSON.parse(json) : {}),
  };
}

function storeSettings(settings: Settings) {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

type SettingsContextType = Settings & {
  saveInterests: (interests: string[]) => void;
};

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

interface SettingsProviderProps extends React.PropsWithChildren<{}> {}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const [settings, setSettings] = useState(loadSettings());

  const saveInterests = (interests: string[]) => {
    const updated = { ...settings, interests };
    storeSettings(updated);
    setSettings(updated);
  };

  return (
    <SettingsContext.Provider value={{ ...settings, saveInterests }}>
      {children}
    </SettingsContext.Provider>
  );
};
