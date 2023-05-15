import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, Dimensions } from 'react-native';
import {Stack, useRouter, useSearchParams } from 'expo-router'
import { useCallback, useState, useEffect } from 'react';

import { Company, JobAbout, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'
import { COLORS, Colours, icons, SIZES } from '../../constants'
import useFetch from '../../hook/useFetch';
import { firebase } from '../../config' 


const TradeDetails = () => {
    const params = useSearchParams();

    const { isLoading, } = useFetch()
    const [refreshing, setRefreshing] = useState(false);
    const [trades, setTrades] = useState([]);
    const [accountType, setAccount] = useState('PRACTICE')

    const onRefresh = () => {}

    useEffect(() => {
        firebase.firestore().collection('Settings').doc('settings').onSnapshot((querySnapshot) => {
            const accTpye =  querySnapshot.data().app_acc;
            setAccount(accTpye)
            
       });
      },[]);

    useEffect(() => {
        firebase.firestore().collection('Accounts/'+accountType+'/Trades').doc(params.id).onSnapshot((querySnapshot) => {
            const newDetails = [];
            const action =  querySnapshot.data().action;
            const asset =  querySnapshot.data().asset;
            const currency =  querySnapshot.data().currency;
            const date =  querySnapshot.data().date;
            const investment =  querySnapshot.data().investment;
            const profit =  querySnapshot.data().profit;
            const result =  querySnapshot.data().result;
            const rsi =  querySnapshot.data().rsi;
            const time =  querySnapshot.data().time;
            newDetails.push({action, asset, date, investment, currency, profit, result, rsi, time })
            setTrades(newDetails);
         }); 
    },[]);

    return (
        <SafeAreaView>
           <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                {isLoading? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : (
                    trades?.map((trade) => (
                    <Company
                            assetImage={icons.eurusd}
                            arrowImage={ trade.action === "put" ? icons.downArrow : icons.upArrow}
                            asset={trade.asset}
                            action={trade.action}
                            currency={trade.currency}
                            date={trade.date}
                            investment={trade.investment}
                            profit={trade.profit}
                            result={trade.result}
                            rsi={trade.rsi}
                            time={trade.time}
                        />
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default TradeDetails