import { useState, useEffect } from 'react'
import { View, Text, Animated, TouchableOpacity, TextInput } from "react-native";

import { firebase } from '../../../config'

import LiquidProgress from "react-native-liquid-progress"
import styles from './target.style'

const Target = () => {
    const [balance, setBalance] = useState(0);
    const [target, setTarget] = useState(0);
    const [value, setValue] = useState(0);
    const [currency, setCurrency] = useState(null);
    const [accountType, setAccount] = useState('PRACTICE')

    useEffect(() => {
        firebase.firestore().collection('Settings').doc('settings').onSnapshot((querySnapshot) => {
            const accTpye =  querySnapshot.data().app_acc;
            setAccount(accTpye)
       });
       firebase.firestore().collection('Accounts').doc(accountType).onSnapshot((querySnapshot) => {
            const Balance = querySnapshot.data().Balance;
            const target = querySnapshot.data().target;
            const currency = querySnapshot.data().currency;
            setCurrency(currency)
            setBalance(Balance)
            setTarget(target)
            setValue(balance / target)
        });
      },[]);

    return (
        <View style={ styles.container }>
            
            <LiquidProgress
                backgroundColor={"black"}
                frontWaveColor={"orange"}
                backWaveColor={"orange"}
                fill={value}
                size={290}
                customMask={<View style={{ backgroundColor: "red", width: 290, height: 290, borderRadius: 290 }}></View>}
            >
                <Animated.View style={styles.row}>
                    <Text style={styles.text}>{(value * 100).toFixed(2)}%</Text>
                </Animated.View>
            </LiquidProgress>
            <Text style={styles.textHeader}>Target</Text>
            <Text style={styles.textTarget}>{currency}{target}</Text> 
            <View style={styles.buttonLayer}>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Set Target</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Target