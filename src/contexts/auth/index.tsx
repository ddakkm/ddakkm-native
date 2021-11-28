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
  nickname: string;
  setIsLoggedIn: (value: boolean) => void;
  setIsSurvey: (value: boolean) => void;
  setNickname: (value: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  is_loggedIn: null,
  is_survey: null,
  nickname: '',
  setIsLoggedIn: () => {},
  setIsSurvey: () => {},
  setNickname: () => {},
  logout: () => {},
});

const AuthProvider: FC = ({ children }) => {
  const [is_loggedIn, setIsLoggedIn] = useState(false);
  const [is_survey, setIsSurvey] = useState(false);
  const [nickname, setNickname] = useState('');

  const logout = () => {
    setIsLoggedIn(false);
    setIsSurvey(false);
    setNickname('');
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await readTokens();
        if (token) {
          setIsLoggedIn(true);
        }
        if (is_loggedIn) {
          const {
            data: { done_survey },
          } = await authApi.isJoinSurvey();
          if (done_survey) {
            setIsSurvey(true);
          }
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        is_loggedIn,
        is_survey,
        setIsLoggedIn,
        setIsSurvey,
        nickname,
        setNickname,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useIsLoggedIn = () => useContext(AuthContext);
