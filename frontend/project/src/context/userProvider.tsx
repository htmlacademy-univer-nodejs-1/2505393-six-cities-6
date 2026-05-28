import {PropsWithChildren, useState} from 'react';
import {UserContext} from './user';
import {User} from '../types/user';


function UserProvider(
  {children}: PropsWithChildren,
): JSX.Element {
  const [user, setUser] = useState<User>({
    name: '',
    surname: '',
    avatar: '',
    email: '',
  });

  const state = {
    user,
    updateUser: (userData: User) => setUser(userData),
  };

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}

export default UserProvider;
