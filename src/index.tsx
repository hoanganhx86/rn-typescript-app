import * as React from 'react';

import AppNavigation from './navigation';
import { ThemeProvider } from './styles/theming';

console.disableYellowBox = true;

const App = () => {
  return (
    <ThemeProvider>
      <AppNavigation />
    </ThemeProvider>
  );
};

export default App;
