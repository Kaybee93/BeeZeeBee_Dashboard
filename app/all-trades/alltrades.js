import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, ScrollView} from 'react-native';
import { Stack, useRouter } from 'expo-router'

import styles from '../../components/home/t-overview/tradeoverview.style'
import { COLORS } from '../../constants'
import NearbyJobCard from '../../components/common/cards/overview/TradeOverviewCard'
import useFetch from '../../hook/useFetch';
import { firebase } from '../../config' 

const allTrades = () => {
  const router = useRouter();
  const [trades, setTrades] = useState([]);
  const [accountType, setAccount] = useState('PRACTICE')
  
  const { isLoading} = useFetch('search', {
    query: 'DevOps',
    num_pages: 1
  });

  useEffect(() => {
    firebase.firestore().collection('Settings').doc('settings').onSnapshot((querySnapshot) => {
        const accTpye =  querySnapshot.data().app_acc;
        setAccount(accTpye)
        
   });
  },[]);

  useEffect(() => {
    const trades = firebase.firestore().collection('Accounts/'+accountType+'/Trades').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        const newTrades = []
        snapshot.forEach((doc) => {
          const timestamp = doc.data().timestamp
          const newDate = new Date(timestamp*1000)
          const longDate = newDate.toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          const { action, currency, asset, date, investment, profit, result, rsi, time} = doc.data()
          if (!newTrades[longDate]) {
            newTrades[longDate] = [{tradeid: doc.id, action, asset, currency, date, investment, profit, result, rsi, time}];
          } else {
            newTrades[longDate].push({tradeid: doc.id, action, asset, currency, date, investment, profit, result, rsi, time});
          }
        })
        setTrades(newTrades)  
   });
   return () => trades();
  },[]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen
          options={{
              headerStyle: { backgroundColor: COLORS.orange },
              headerTitle: "All Trades",
          }}
      />
      <Stack.Screen   />
      <ScrollView style={{ padding: 20}}>
        {Object.entries(trades).map(([date, items]) => (
          <View key={date}>
            <Text style={styles.tradeDate}>{date}</Text>
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 10}}>
                  <NearbyJobCard
                  item={item}
                  key={`nearby-job-${item?.tradeid}`}
                  handleNavigate={() => router.push(`/trade-details/${item.tradeid}`)}
                />
                </View>
              )}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default allTrades