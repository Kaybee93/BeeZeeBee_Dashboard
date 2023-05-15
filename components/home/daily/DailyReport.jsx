import { useState, useEffect } from "react";
import { View, ScrollView, Text, Dimensions, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import useFetch from '../../../hook/useFetch';
import { LineChart } from 'react-native-chart-kit';
import { COLORS, icons, SIZES } from '../../../constants'

import { firebase } from '../../../config'
import styles from './daily.style'
import DailyTradesCard from '../../common/cards/daily/DailyTradesCard'
import { useSafeAreaFrame } from "react-native-safe-area-context";


const DailyReport = () => {
    const router = useRouter();

    const { isLoading} = useFetch('search', {
        query: 'DevOps',
        num_pages: 1
      });

    const [dailyReport, setDailyReport] = useState([]) 
    const [dailydate, setDailyDate] = useState([]) 
    const [dailyReportAsc, setDailyReportAsc] = useState([]) 
    const [accountType, setAccount] = useState('PRACTICE')

    useEffect(() => {
        firebase.firestore().collection('Settings').doc('settings').onSnapshot((querySnapshot) => {
            const accTpye =  querySnapshot.data().app_acc;
            setAccount(accTpye)
            
       });
      },[]);
      
      useEffect(() => {
        const fetchData = async () => {
            const snapshot = await firebase.firestore().collection('/Data/daily_report/' + accountType).orderBy('timestamp', 'desc').limit(5).get();
            const docs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            console.log()
          setDailyReport(docs)
       };
        const fetchDataAsc = async () => {
            const snapshot = await firebase.firestore().collection('/Data/daily_report/' + accountType).orderBy('timestamp', 'desc').limit(5).get();
            const docs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            console.log()
            setDailyReportAsc(docs)
        };
       fetchData();
       fetchDataAsc();
      }, []);

    if (dailyReportAsc?.length === 0) {
        return (
            <View style={styles.screen}>
            <Text>No chart data to display!</Text>
            </View>
        );
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
            <ScrollView>
                <Text style={styles.headerTitle}>Daily Report Chart (Last 5 Days)</Text>
                {isLoading ? (
                    <ActivityIndicator size="large" colors={COLORS.primary}/>
                ) :(
                    <LineChart
                        data={{ 
                            labels: dailyReportAsc.reverse().map(item => (
                                timestamp = item.date,
                                date = new Date(timestamp),
                                shortDate = date.toLocaleDateString('en-ZA', {
                                month: 'short',
                                day: 'numeric',
                                })
                            )),
                            datasets: [{data: dailyReportAsc.map(item => item.closing_balance)}]
                        }}
                        width={Dimensions.get('window').width - 25}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#1cc910',
                            backgroundGradientFrom: '#000',
                            backgroundGradientTo: '#000',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(242, 211, 10, ${opacity})`,
                            style: {borderRadius: 16,},
                        }}
                        style={{ alignItems: 'center', marginVertical: 8, borderRadius: 16,}}
                    />
                )}
                <View>
                    <View style={styles.header}>
                        <Text style={styles.headerBold}>Daily History</Text>
                        <TouchableOpacity onPress={() => router.push(`/all-days/alldays`)}>
                            <Text style={styles.headerBtn}>Show All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardsContainer}>
                        {isLoading ? (
                            <ActivityIndicator size="large" colors={COLORS.primary}/>
                            ) : (
                                dailyReport?.map((report) => (
                                <DailyTradesCard 
                                    item={report}
                                    key={`daily-trade-${dailyReport?.id}`}
                                    handleNavigate={() => router.push(`/daily-report/${report.id}`)}
                                />
                            ))
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DailyReport