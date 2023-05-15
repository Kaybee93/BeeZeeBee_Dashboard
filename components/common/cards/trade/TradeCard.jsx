import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './tradecard.style'

import { checkImageURL } from '../../../../utils'

const NearbyJobCard = ({ trade, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>


      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {trade.asset}
        </Text>
        <Text style={trade.time}>12:45:23</Text>
      </View>
    </TouchableOpacity>
  )
}

export default NearbyJobCard