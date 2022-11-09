import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect } from 'react';
import useSWR from 'swr';
import { IMe } from '../typings/db';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Session = IMe | null;
interface IContext {
  session: Session;
  setSession: Dispatch<SetStateAction<Session>>;
}

export interface IProvider {
  children: ReactNode;
}

const TYPES = {
  SET: Symbol('setSession'),
  LOGIN: Symbol('login'),
  LOGOUT: Symbol('logout'),
};

const SessionContext = createContext<IContext | any>({});

const SessionProvider = ({ children }: IProvider) => {
  const navigate = useNavigate();

  const { data: session } = useSWR<IMe>('/users/me', (url: string) => axios.get(url).then((res) => res.data || null));

  useEffect(() => {
    if (session === null) navigate('/login');
  }, [session]);

  return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>;
};

export const useSession = () => useContext(SessionContext);

export default SessionProvider;
