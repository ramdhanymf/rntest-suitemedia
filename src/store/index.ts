import React from 'react';

const UserContext = React.createContext<
  | undefined
  | {
      user: User | undefined;
      setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    }
>(undefined);

export default UserContext;
