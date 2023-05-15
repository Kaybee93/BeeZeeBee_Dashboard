import React from 'react'
import { View, Text, Image } from 'react-native'
import { Stack } from "expo-router";

import styles from './company.style'

const Company = ( {assetImage, arrowImage, asset, action, currency, date, investment, profit, result, rsi,time}) => {
  return (
    <View style={styles.container}>
      <Stack.Screen
                options={{
                    headerTitle: "Results",
                }}
            />
            <Stack.Screen   />
      <View style={styles.logoBox}>
        <Image source={assetImage}
         style={styles.logoImage}
         />
      </View>

      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{asset}</Text>
      </View>

      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{date}</Text>
      </View>

      <View style={styles.resultcontainer}>
        <View style={styles.jobTitleBox}>
          <Text>Investment</Text>
          <Text style={styles.jobTitle}>{currency}{investment}</Text>
        </View>

        <View style={styles.arrowBox}>
          <Text style={{ textAlign: 'center'}}>Action</Text>
          <Image source={arrowImage}
          style={styles.arrowImage}
          />
        </View>

        <View style={styles.jobTitleBox}>
          <Text>Profit(P/L)</Text>
          <Text style={styles.tradeResult(result)}>{currency}{profit}</Text>
        </View>
      </View>

      <View style={styles.resultcontainer}>
        <View style={styles.jobTitleBox}>
          <Text>Purchase Time</Text>
          <Text style={styles.jobTitle}>{time}</Text>
        </View>

        <View style={styles.rsiBox}>
          <Text style={{ textAlign: 'center'}}>RSI</Text>
          <Text style={styles.rsi}>{rsi}</Text>
        </View>

        <View style={styles.jobTitleBox}>
          <Text>Result</Text>
          <Text style={styles.jobTitle}>{result}</Text>
        </View>
      </View>
      
    </View>
  )
}

export default Company