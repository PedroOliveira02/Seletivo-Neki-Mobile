import React from 'react';
import { AuthProvider } from './src/contexts/AuthProvider';
import RoutesApp from './src/routes';

const App = () => {
  return (
    
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    
  );
};




// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#f0f2f5",
//     fontFamily: "Arial, Helvetica, sans-serif",
//   },
// });

export default App;
