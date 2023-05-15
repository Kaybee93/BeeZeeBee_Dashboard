import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './tradeoverviewcard.style'

import { COLORS, icons, images, SIZES, SIZESS } from '../../../../constants'


const NearbyJobCard = ({ item, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image 
          source={icons.eurusd} 
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      
      <View style={styles.textContainer}>
        <View style={styles.investContainer}>
          <Text style={styles.assetName}>{item.asset}</Text>
          <Text style={styles.tradeInvest}>$ {item.investment}</Text>
        </View>

        <View style={styles.investContainer}>
          <Text style={styles.tradeTime}>{item.time}</Text>
          <View style={styles.arrowContainer}>
            <Image 
              source={item.action === "call" ? icons.upArrow : icons.downArrow} 
              resizeMode='contain'
              style={styles.arrowImage}
            />
          </View>
          <Text style={styles.tradeProfit(item.result)}>$ {item.profit}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default NearbyJobCard