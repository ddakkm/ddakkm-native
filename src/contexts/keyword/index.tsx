import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';

interface KeywordContextProps {
  is_loggedIn: boolean | null;
  is_survey: boolean | null;
}

const KeywordContext = createContext<KeywordContextProps>({
  is_loggedIn: null,
  is_survey: null,
});

const KeywordProvider: FC = ({ children }) => {
  return (
    <KeywordContext.Provider value={{ is_loggedIn, is_survey }}>
      {children}
    </KeywordContext.Provider>
  );
};

export default KeywordProvider;

export const useIsLoggedIn = () => useContext(KeywordContext);
