import { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native'
import { Stack } from "expo-router";
import { firebase } from '../../../config' 

import styles from './report.style'

const Report = ( {closing, currency, date, loss_count, opening, percentage, profit_loss, timestamp}) => {
  const [count, setCount] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);
  const newDate = new Date(timestamp)
  const longDate = newDate.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await firebase.firestore().collection('/Accounts/REAL/Trades')
        .where('date', '==', date)
        .get();
      setCount(querySnapshot.size);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await firebase.firestore().collection('/Accounts/REAL/Trades')
        .where('date', '==', date)
        .where('result', '==', 'win')
        .get();
        setWinCount(querySnapshot.size);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await firebase.firestore().collection('/Accounts/REAL/Trades')
        .where('date', '==', date)
        .where('result', '==', 'loss')
        .get();
        setLossCount(querySnapshot.size);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
            headerTitle: longDate,
        }}
        />
      <Stack.Screen/>

      <View style={styles.resultcontainer}>
        <View style={styles.jobTitleBox}>
          <Text>Opening Balance</Text>
          <Text style={styles.jobTitle}>{currency}{opening}</Text>
        </View>

        <View style={styles.jobTitleBox}>
          <Text>Closing Balance</Text>
          <Text style={styles.jobTitle}>{currency}{closing}</Text>
        </View>
      </View>

      <View style={styles.resultcontainer}>
        <View style={styles.jobTitleBox}>
          <Text>Percentage</Text>
          <Text style={styles.jobTitle}>{percentage}%</Text>
        </View>

        <View style={styles.jobTitleBox}>
          <Text style={{ textAlign: 'center'}}>Loss Count</Text>
          <Text style={styles.jobTitle}>{loss_count}</Text>
        </View>

        <View style={styles.jobTitleBox}>
          <Text style={{ textAlign: 'center'}}>Profit(P/L)</Text>
          <Text style={styles.jobTitle}>{currency}{profit_loss}</Text>
        </View>
      </View>

      <View style={styles.resultcontainer}>
        <View style={styles.jobTitleBox}>
          <Text>Total Wins</Text>
          <Text style={styles.jobTitle}>{winCount}</Text>
        </View>

        <View style={styles.jobTitleBox}>
          <Text style={{ textAlign: 'center'}}>Total Losses</Text>
          <Text style={styles.jobTitle}>{lossCount}</Text>
        </View>

        <View style={styles.jobTitleBox}>
          <Text>Total Trades</Text>
          <Text style={styles.jobTitle}>{count}</Text>
        </View>
      </View>
      
    </View>
  )
}

export default Report