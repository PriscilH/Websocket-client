// import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

let ws = null;

export default function App() {
  useEffect(() => {
    // Se connecter à un serveur
     ws = new WebSocket("ws://localhost:8080");
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
          title="Send message"
          onPress={() => {
            ws.send("Hello World");
          }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
