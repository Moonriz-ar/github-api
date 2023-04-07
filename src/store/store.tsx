import { proxy, useSnapshot, subscribe } from 'valtio';
import { devtools } from 'valtio/utils'

import { User } from '../types/index';

type NullableUser = User | null;

const storedUser = localStorage.getItem('user');

const store = proxy<{ user: NullableUser }>(
  storedUser ? JSON.parse(storedUser) : { user: null }
);

const unsub = devtools(store, { name: 'store', enabled: true });

subscribe(store, () => {
  localStorage.setItem('user', JSON.stringify(store));
});

const setUser = (user: NullableUser) => {
  store.user = user;
};

export { store, useSnapshot, subscribe, setUser };

// Below is previous implementation with react context
/*
import React, { createContext, useState } from 'react';

import { User } from '../types/index';

interface Props {
  children: React.ReactNode;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
*/
