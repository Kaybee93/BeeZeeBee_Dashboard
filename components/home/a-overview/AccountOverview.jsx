import { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native'

import styles from './accountoverview.style'
import { firebase } from '../../../config'
import { COLORS, SIZES } from '../../../constants'
import useFetch from '../../../hook/useFetch';

import RNSpeedometer from 'react-native-speedometer'

const accTypes = ["DEMO", "REAL"];

const AccountOverview = () => {

  const { isLoading, } = useFetch()
  const [rsi, setRSI] = useState(null)
  const [upper, setUpper] = useState(null)
  const [lower, setLower] = useState(null)
  const [prev_upper, setPrevUpper] = useState(null)
  const [prev_lower, setPrevLower] = useState(null)
  const [isUpper, setIsUpper] = useState(true)
  const [isLower, setIsLower] = useState(true)
  const [accounts, setAccs] = useState([]) 
  const [activeAccType, setActiveAccType] = useState('DEMO')
  const [accountType, setAccount] = useState(null)

  useEffect(() => {
    firebase.firestore().collection('Settings').doc('settings').onSnapshot((querySnapshot) => {
        const appType =  querySnapshot.data().app_acc;
        setAccount(appType)
        if (appType == "PRACTICE"){
          setActiveAccType('DEMO')
        } else {
          setActiveAccType(appType)
        }       
   });
  },[]);

  useEffect(() => {
    firebase.firestore().collection('Data').doc('technical_analysis').onSnapshot((querySnapshot) => {
      const rsi =  querySnapshot.data().rsi;
      const upper =  querySnapshot.data().diff_upper;
      const lower =  querySnapshot.data().diff_lower;
      const prev_upper =  querySnapshot.data().prev_upper;
      const prev_lower =  querySnapshot.data().prev_lower;
      const trade_upper =  querySnapshot.data().trade_upper;
      const trade_lower =  querySnapshot.data().trade_lower;
      setRSI(rsi)
      setUpper(upper)
      setLower(lower)
      setPrevUpper(prev_upper)
      setPrevLower(prev_lower)
      setIsUpper(trade_upper)
      setIsLower(trade_lower)
   });
  }, []);

  function refresh(){
    firebase.firestore().collection('Accounts').doc(accountType).onSnapshot((querySnapshot) => {
      const newAcc = [];
      const Balance =  querySnapshot.data().Balance;
      const asset =  querySnapshot.data().asset;
      const signal =  querySnapshot.data().signal_search;
      const status =  querySnapshot.data().trade_status;
      const account =  querySnapshot.data().account;
      const currency =  querySnapshot.data().currency;
      newAcc.push({Balance, asset, signal, status, account, currency })
      setAccs(newAcc);
   });
  }

  const handleTabClick = async (item) => {
    const docRef = firebase.firestore().collection('Settings').doc('settings');
    if (item == "DEMO"){
      item = "PRACTICE"
    }
    console.log('Sending ', item);
    docRef.update({
        app_acc: item,
      }).then(() => {
        console.log('Document written!');
      }).catch(error => {
        console.error('Error writing document: ', error);
      });
  };

  if (accountType === null) {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
            <ActivityIndicator size="large" colors={COLORS.orange}/>
        </View>
    );
  }

  refresh()

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
          <FlatList 
            data={accTypes}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.tab(activeAccType, item)}
                  onPress={() => {
                    setActiveAccType(item)
                    if(item == "DEMO"){
                      item = "PRACTICE"
                    }
                    setAccount(item)
                    console.log('Account Type: ', item)
                    handleTabClick(item)
                  }}>
                  <Text style={styles.tabText(activeAccType, item)}>{item}</Text>
                </TouchableOpacity>
            )}
                keyExtractor={item => item}
                contentContainerStyle={{ columnGap: SIZES.small}}
                horizontal
          />
      </View>
      <View style={styles.accountHeader}>
        {isLoading? (
          <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            accounts?.map((item) => (
              <View>
                <View style={styles.accountHeader}>
                  <Text style={styles.headerAccount(item.account)}> {item.currency} {item.Balance} </Text>
                </View>
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Now Trading: </Text>
                  <Text style={styles.headerTitle}>{item.asset}</Text>
                </View>
                
                <Text style={{ textAlign: 'center', marginTop: 10, color: COLORS.white }}>RELATIVE STRENGTH INDEX</Text>
                
                <View style={styles.header}>
                  <View>
                    {isLower?(
                      <Text style={{ textAlign: 'center', marginTop: 10, color: COLORS.green, fontWeight: 'bold' }}>OPEN</Text>
                    ):(
                      <Text style={{ textAlign: 'center', marginTop: 10, color: COLORS.red, fontWeight: 'bold' }}>CLOSED</Text>
                    )}
                    <Text style={{ textAlign: 'center', color: COLORS.white }}>Lower Band</Text>
                    <Text style={{ textAlign: 'center', color: lower > 0? COLORS.red : COLORS.white }}>{lower}</Text>
                    <Text style={{ textAlign: 'center', marginTop: 5, color: COLORS.white }}>Previous</Text>
                    <Text style={{ textAlign: 'center', color: prev_lower > 0? COLORS.red : COLORS.white }}>{prev_lower}</Text>
                  </View>
                  
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <RNSpeedometer
                      value={rsi === null? 0 : rsi}
                      minValue={0}
                      maxValue={100}
                      size={100}
                      allowedDecimals={2}
                      labelStyle={{color: 
                        rsi < 10? '#ff2900': 
                        rsi >= 10 && rsi < 30? '#ff5400':
                        rsi >= 30 && rsi < 50? '#f4ab44':
                        rsi >= 50 && rsi < 70? '#f2cf1f': 
                        rsi >= 70 && rsi < 90? '#14eb6e': '#00ff6b'}}
                      labels={[{
                        labelColor: '#ff2900',
                        activeBarColor: '#ff2900'
                      }, {
                        labelColor: '#ff5400',
                        activeBarColor: '#ff5400'
                      }, {
                        labelColor: '#f4ab44',
                        activeBarColor: '#f4ab44'
                      }, {
                        labelColor: '#f2cf1f',
                        activeBarColor: '#f2cf1f'
                      }, {
                        labelColor: '#14eb6e',
                        activeBarColor: '#14eb6e'
                      }, {
                        labelColor: '#00ff6b',
                        activeBarColor: '#00ff6b'
                      }]}
                      
                      segmentColors={['#ff0000', '#ffa500', '#00ff00']}
                    />
                  </View>
                  <View>
                  {isUpper?(
                      <Text style={{ textAlign: 'center', marginTop: 10, color: COLORS.green, fontWeight: 'bold' }}>OPEN</Text>
                    ):(
                      <Text style={{ textAlign: 'center', marginTop: 10, color: COLORS.red, fontWeight: 'bold' }}>CLOSED</Text>
                    )}
                    <Text style={{ textAlign: 'center', color: COLORS.white }}>Upper Band</Text>
                    <Text style={{ textAlign: 'center', color: upper < 0? COLORS.green : COLORS.white }}>{upper}</Text>
                    <Text style={{ textAlign: 'center', marginTop: 5, color: COLORS.white }}>Previous</Text>
                    <Text style={{ textAlign: 'center', color: prev_upper < 0? COLORS.green : COLORS.white }}>{prev_upper}</Text>
                  </View>
                </View>
                <View style={styles.centerContainer}>
                  <Text style={styles.headerSignal}> {item.signal} </Text>
                  <Text style={{color: 'orange'}}> {item.status} </Text>
                </View>
              </View>
          ))
      )}
      </View>
    </View>
  )
  
}

export default AccountOverview