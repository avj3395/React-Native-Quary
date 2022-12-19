import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import Navigations from './src/navigation';
import {RecoilRoot} from 'recoil';

const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Navigations />
          </NavigationContainer>
        </QueryClientProvider>
      </RecoilRoot>
    </SafeAreaProvider>
  );
};

export default App;
