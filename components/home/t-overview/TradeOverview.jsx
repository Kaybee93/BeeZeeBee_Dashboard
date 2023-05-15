import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView} from 'react-native';
import { useRouter } from 'expo-router'

import styles from './tradeoverview.style'
import { COLORS } from '../../../constants'
import NearbyJobCard from '../../common/cards/overview/TradeOverviewCard'
import useFetch from '../../../hook/useFetch';
import { firebase } from '../../../config' 


const TradeOverview = () => {
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
  
  function refresh(){
    firebase.firestore().collection('Accounts/'+accountType+'/Trades').orderBy('timestamp', 'desc').limit(5).onSnapshot((querySnapshot) => {
      const trades = []
      querySnapshot.forEach((doc) => {
          const { action, currency, asset, date, investment, profit, result, rsi, time} = doc.data()
          trades.push({tradeid: doc.id, action, asset, currency, date, investment, profit, result, rsi, time})
      })
      setTrades(trades)
   });
  }

  refresh()
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerBold}>Trade History</Text>
        <TouchableOpacity onPress={() => router.push(`/all-trades/alltrades`)}>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary}/>
        ) : (
          trades?.map((trade) => (
            <NearbyJobCard 
              item={trade}
              key={`nearby-job-${trade?.tradeid}`}
              handleNavigate={() => router.push(`/trade-details/${trade.tradeid}`)}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default TradeOverview