import { useState, useEffect } from "react";
import { View, ScrollView, Text, Dimensions, TouchableOpacity, SafeAreaView, ActivityIndicator} from "react-native";
import { useRouter } from "expo-router";
import useFetch from '../../../hook/useFetch';
import { LineChart } from 'react-native-chart-kit';
import { COLORS, icons, SIZES } from '../../../constants'

import { firebase } from '../../../config'
import styles from './daily.style'
import DailyTradesCard from '../../common/cards/daily/DailyTradesCard'

const DailyReport = () => {
    const router = useRouter();

    const { isLoading} = useFetch('search', {
        query: 'DevOps',
        num_pages: 1
      });

    const [dailyReport, setDailyReport] = useState([]) 
    const [accountType, setAccount] = useState(null)
    const [interval, setInterval] = useState(5)

    useEffect(() => {
        firebase.firestore().collection('Settings').doc('settings').onSnapshot((querySnapshot) => {
            const accTpye =  querySnapshot.data().app_acc;
            setAccount(accTpye)   
        });
    },[]);

    function refresh(){
        firebase.firestore().collection('/Data/daily_report/' + accountType).orderBy('timestamp', 'desc').limit(interval).onSnapshot((querySnapshot) => {
          const report = []
          querySnapshot.forEach((doc) => {
              const { closing_balance, currency, date, loss_count, opening_balance, percentage, profit_loss, timestamp} = doc.data()
              report.push({reportid: doc.id, closing_balance, currency, date, loss_count, opening_balance, percentage, profit_loss, timestamp})
          })
          setDailyReport(report)
       });
    }

    refresh()

    if (dailyReport?.length === 0) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
                <ActivityIndicator size="large" colors={COLORS.orange}/>
                <Text style={{ fontWeight: "bold", textAlign: "center"}}>Loading Data</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
            <ScrollView>
                <Text style={styles.headerTitle}>Daily Report Chart (Last 5 Days)</Text>
                <LineChart
                    data={{ 
                        labels: dailyReport.reverse().map(item => (
                            timestamp = item.date,
                            date = new Date(timestamp),
                            shortDate = date.toLocaleDateString('en-ZA', {
                            month: 'short',
                            day: 'numeric',
                            })
                        )),
                        datasets: [{data: dailyReport.map(item => item.closing_balance)}]
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
                                dailyReport.reverse()?.map((report) => (
                                <DailyTradesCard 
                                    item={report}
                                    key={`daily-trade-${dailyReport?.id}`}
                                    handleNavigate={() => router.push(`/daily-report/${report.reportid}`)}
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