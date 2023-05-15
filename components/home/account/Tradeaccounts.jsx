import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './tradeaccounts.style'
import { COLORS, SIZE, SIZES } from '../../../constants'
import DemoAccountCard from '../../common/cards/demo/DemoAccountCard'
import useFetch from '../../../hook/useFetch';

const Tradeaccounts = () => {
  const router = useRouter();

  
  const { data, isLoading, error } = useFetch('search', {
    query: 'DevOps',
    num_pages: 1
  })

  return (
    <View style={styles.container}>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary}/>
        ) : (
          <FlatList
           data={[1]}
           renderItem={({ item }) => (
            <DemoAccountCard
              item={item}
            />
           )}
           keyExtractor={item => item?.job_id}
           contentContainerStyle={{ columnGap: SIZES.medium}}
           horizontal
          />
        )}
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Now Trading - EURUSD </Text>
      </View>
      
      <View>
        <Text>RELATIVE STRENGTH INDEX: 68.32</Text>
      </View>
    </View>
  )
}

export default Tradeaccounts