import { useState, useEffect } from "react";
import { View} from "react-native";
import { Stack, useRouter } from "expo-router";
import useFetch from '../../hook/useFetch';
import { COLORS, SIZES } from '../../constants'

import { firebase } from '../../config'
import styles from '../../components/home/daily/daily.style'
import DailyTradesCard from '../../components/common/cards/daily/DailyTradesCard'
import { ScrollView } from "react-native-gesture-handler";


const DailyReport = () => {
  const router = useRouter();

  const { isLoading} = useFetch('search', {
      query: 'DevOps',
      num_pages: 1
    });

  const [dailyReport, setDailyReport] = useState([]) 
  const [accountType, setAccount] = useState('REAL')

  useEffect(() => {
      firebase.firestore().collection('Settings').doc('settings').onSnapshot((querySnapshot) => {
          const accTpye =  querySnapshot.data().app_acc;
          setAccount(accTpye)
          
      });
    },[]);
    
    useEffect(() => {
      const fetchData = async () => {
          const snapshot = await firebase.firestore().collection('/Data/daily_report/' + accountType).orderBy('timestamp', 'desc').get();
          const docs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          console.log()
        setDailyReport(docs)
      };
      fetchData();
    }, []);

  return (
    <View style={{ flex: 1}}>
      <Stack.Screen
          options={{
              headerStyle: { backgroundColor: COLORS.orange },
              headerTitle: "All Days",
          }}
      />
      <Stack.Screen/>
      <ScrollView>
        <View style={styles.cardsContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" colors={COLORS.primary}/>
              ) : (
                dailyReport?.map((report) => (
                <DailyTradesCard 
                  item={report}
                  key={`daily-tradeAll-${dailyReport?.id}`}
                  handleNavigate={() => router.push(`/daily-report/${report.id}`)}
                />
              ))
            )}
        </View>
      </ScrollView>
    </View>
  )
}

export default DailyReport