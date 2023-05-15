import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './dailytradescard.style'

const DailyTradesCard = ({ item, handleNavigate }) => {
  const timestamp = item.timestamp
  const date = new Date(timestamp)
  const longDate = date.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>

      <View style={styles.textContainer}>
        <View>
        <Text style={styles.jobName}>
          {longDate}
        </Text>
        <Text style={styles.jobName}>Profit/Loss</Text>
        </View>
        
        <View style={styles.investContainer}>
          <Text style={styles.tradeInvest}>{item.currency} {item.closing_balance}</Text>
          
          <Text style={styles.tradeProfit(item.profit_loss)}>{item.currency} {item.profit_loss}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default DailyTradesCard