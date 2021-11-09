import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { authApi } from '../../api/auth';
import { readTokens } from './storage';

interface AuthContextProps {
  is_loggedIn: boolean | null;
  is_survey: boolean | null;
}

const AuthContext = createContext<AuthContextProps>({
  is_loggedIn: null,
  is_survey: null,
});

const AuthProvider: FC = ({ children }) => {
  const [is_loggedIn, setIsLoggedIn] = useState(false);
  const [is_survey, setIsSurvey] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await readTokens();
      const {
        data: { done_survey },
      } = await authApi.isJoinSurvey();
      if (token) {
        setIsLoggedIn(true);
      }
      if (done_survey) {
        setIsSurvey(true);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ is_loggedIn, is_survey }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useIsLoggedIn = () => useContext(AuthContext);
