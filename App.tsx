/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import RootNavigation from './src/routes';
import AppContext from './src/store';

const App = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <RootNavigation />
    </AppContext.Provider>
  );
};

export default App;
