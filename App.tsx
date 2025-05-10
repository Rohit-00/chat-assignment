import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  return (
    <MenuProvider>
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#faf9f4' }}>
    <SafeAreaView style={styles.container}>
  <Home/>
  </SafeAreaView>
  </SafeAreaProvider>
  </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f4',
  },
});
