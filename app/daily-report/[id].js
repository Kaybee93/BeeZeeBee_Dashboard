import { View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useSearchParams } from 'expo-router'
import { useState, useEffect } from 'react';

import { Report } from '../../components'
import { COLORS } from '../../constants'
import { firebase } from '../../config' 

import useFetch from '../../hook/useFetch';

const DailyReport = () => {
    const params = useSearchParams();

    const { isLoading, } = useFetch()
    const [refreshing, setRefreshing] = useState(false);
    const [report, setReports] = useState([]);
    const [accountType, setAccount] = useState('PRACTICE')

    const onRefresh = () => {}
    console.log(params.id)

    useEffect(() => {
        firebase.firestore().collection('Settings').doc('settings').onSnapshot((querySnapshot) => {
            const accTpye =  querySnapshot.data().app_acc;
            setAccount(accTpye)
            
       });
      },[]);

    useEffect(() => {
        firebase.firestore().collection('/Data/daily_report/' + accountType).doc(params.id).onSnapshot((querySnapshot) => {
            const newReport = [];
            const closing_balance = querySnapshot.data().closing_balance;
            const currency = querySnapshot.data().currency;
            const date = querySnapshot.data().date;
            const loss_count = querySnapshot.data().loss_count;
            const opening_balance = querySnapshot.data().opening_balance;
            const percentage = querySnapshot.data().percentage;
            const profit_loss = querySnapshot.data().profit_loss;
            const timestamp = querySnapshot.data().timestamp;
            newReport.push({closing_balance, currency, date, loss_count, opening_balance, percentage, profit_loss, timestamp})
            console.log(newReport)
            setReports(newReport);
         }); 
    },[]);

    return (
        <View style={{ backgroundColor: COLORS.black }}>
           <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                {isLoading? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : (
                        report?.map((trade) => (
                        <Report
                            closing={trade.closing_balance}
                            currency={trade.currency}
                            date={trade.date}
                            loss_count={trade.loss_count}
                            opening={trade.opening_balance}
                            percentage={trade.percentage}
                            profit_loss={trade.profit_loss}
                            timestamp={trade.timestamp}
                        />
                    ))
                )}
            </ScrollView>
        </View>
    )
}

export default DailyReport