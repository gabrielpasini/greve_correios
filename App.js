import React, {useEffect, useState} from 'react';
import Axios from './axios.config';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import admob, {
  MaxAdContentRating,
  BannerAd,
  BannerAdSize,
  TestIds,
} from '@react-native-firebase/admob';

const App = () => {
  useEffect(() => {
    admob().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.PG,
      tagForChildDirectedTreatment: true,
      tagForUnderAgeOfConsent: true,
    });
  }, []);

  const [status, setStatus] = useState('');
  const [loadingBtn, setLoadingBtn] = useState(false);
  const adUnitId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-1245913773049448/2413151639';

  const verificar = async () => {
    if (status) {
      Alert.alert(
        'CALMA AÍ!',
        'Você já verificou o sistema recentemente! Tente novamente mais tarde...',
      );
      return;
    }
    setLoadingBtn(true);
    const res = await Axios.get('correios-status');
    setStatus(res.data[0].status ? 'SIM' : 'NÃO');
    setLoadingBtn(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <View>
            <Text style={styles.text}>Os correios estão em greve?</Text>
            <Button
              mode="contained"
              color="#0071AD"
              loading={loadingBtn}
              onPress={verificar}>
              <Text style={styles.btnText}>VERIFICAR</Text>
            </Button>
            <Text style={styles.response}>{status}</Text>
            <View style={styles.ad}>
              <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.MEDIUM_RECTANGLE}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const textShadow = {
  textShadowColor: 'rgba(0, 0, 0, 0.75)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 10,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE600',
    height: '100%',
    padding: 20,
    flexWrap: 'nowrap',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingBottom: 40,
    paddingTop: 20,
    ...textShadow,
  },
  btnText: {
    fontSize: 22,
  },
  response: {
    alignSelf: 'center',
    fontSize: 80,
    fontWeight: 'bold',
    color: '#fff',
    paddingVertical: 40,
    ...textShadow,
  },
  ad: {alignSelf: 'center'},
});

export default App;
