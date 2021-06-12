import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Dimensions} from 'react-native';
import MapView ,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';

const {height,width} = Dimensions.get('screen')
const geolib = require('geolib');
export default function App() {
  return (
    <MapView
    provider={PROVIDER_GOOGLE}
    region = {{
      longitude:31.23591291282258,
      latitude:30.044303,
      latitudeDelta : 0.09,
      longitudeDelta : 0.035 
    }}
    style={{
      height: height*0.8
    }}
    >
      {
        console.log(geolib.getDistance( { latitude: 30.04009595744254, longitude: 31.232743937244273 },{longitude:31.23591291282258, latitude:30.044303,})/1000)
      }
      <Marker
      coordinate={{latitude : 30.04409499374853,longitude : 31.238782008146906}}
      title='Greek Campus'
      >

      </Marker>
      </MapView>
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
