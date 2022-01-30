import React from 'react';
import {
  Text,
  useColorScheme,
  View,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

function App(){
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingView}></View>
      <View style={styles.ddayView}></View>
      <View style={styles.chatView}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
  },
  settingView : {
    flex: 1,
    backgroundColor: 'red'
  },
  ddayView : {
    flex : 6,
    backgroundColor: 'green',
  },
  chatView : {
    flex : 6,
    backgroundColor: 'blue'
  }
})

export default App;
