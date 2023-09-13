import {
  createContext,
  Dispatch,
  FC,
  useCallback,
  useContext,
  useReducer,
} from 'react';

import { DynamicType } from '@libs/models/model';
import { UserProps } from '@libs/models/session.model';

import { logoutCookie } from 'prac-portfolio/utils/cookie.utils';

enum SessionContextKeys {
  TOKEN = '@session/token',
  LOGGED_IN = '@session/loggedIn',
  LOGOUT = '@session/logout',
  USER = '@session/user',
}

export interface SessionState {
  user?: UserProps;
}

export type SessionActions =
  | {
      type: SessionContextKeys.USER;
      payload: UserProps;
    }
  | {
      type: SessionContextKeys.LOGOUT;
    };

const initialSessionState: SessionState = {};

const SessionReducer = (
  state: SessionState,
  action: SessionActions,
): SessionState => {
  const { type } = action;

  switch (type) {
    case SessionContextKeys.USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case SessionContextKeys.LOGOUT: {
      return {
        ...initialSessionState,
      };
    }
    default:
      return state;
  }
};

type Context = {
  state: SessionState;
  dispatch: Dispatch<SessionActions>;
};

const SessionContext: DynamicType = createContext<Context | undefined>(
  undefined,
);

const SessionProvider: FC<DynamicType> = ({ children }) => {
  const [ state, dispatch ] = useReducer(SessionReducer, initialSessionState);
  const value = { state, dispatch };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

const useSession = () => {
  const context: Context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  const { state, dispatch } = context;
  const { user } = state || {};

  return {
    user,
    changeUser: useCallback(
      (newUser: UserProps) => {
        dispatch({
          type    : SessionContextKeys.USER,
          payload : newUser,
        });
      },
      [ dispatch ],
    ),
    logout: useCallback(() => {
      logoutCookie();

      dispatch({
        type: SessionContextKeys.LOGOUT,
      });
    }, [ dispatch ]),
  };
};

export { SessionProvider, useSession };
