import React from 'react';
import {
  Text,
  useColorScheme,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
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
      <ImageBackground
        source={require('./images/background.png')}
        style={{ width:'100%', height: '100%' }}>
        <View style={styles.settingView}>
          <TouchableOpacity>
            <Image source={require('./icons/setting.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.ddayView}>
          <Text style={styles.titleText}>
            수능까지
          </Text>
          <Text style={styles.ddayText}>
            D - 123
          </Text>
          <Text style={styles.dateText}>
            2022년 11월 20일
          </Text>
        </View>
        <View style={styles.chatView}>
          <ScrollView style={styles.chatScrollView}>

          </ScrollView>
          <View style={styles.chatControl}>
            <TextInput style={styles.chatInput}/>
            <TouchableOpacity style={styles.sendButton}>
              <Text>
                전송
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
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
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: '1%',
  },
  ddayView : {
    flex : 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText : {
    alignSelf: 'flex-end',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginRight: '15%',
  },
  ddayText : {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  dateText : {
    alignSelf: 'flex-start',
    fontSize: 21,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginLeft: '15%'
  },
  chatView : {
    flex : 6,
  },
  chatScrollView : {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'grey',
    borderRadius: 5,
    margin: 10,
    backgroundColor: 'rgba(201,201,201,0.7)',
    borderWidth: 1,
    borderColor: '#a5a5a5',
  },
  chatControl : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  chatInput: {
    backgroundColor: 'white',
    width: '75%',
    height: 40,
    borderWidth: 1,
    borderColor: '#a5a5a5',
    borderRadius: 20
  },
  sendButton: {
    backgroundColor: 'rgb(97,99,250)',
    height: 40,
    width: 50,
    borderRadius: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5
  }
});

export default App;
