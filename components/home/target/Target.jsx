import { useState, useEffect } from 'react'
import { View, Text, Animated, TouchableOpacity, TextInput, ActivityIndicator} from "react-native";

import { firebase } from '../../../config'

import LiquidProgress from "react-native-liquid-progress"
import styles from './target.style'
import { COLORS } from '../../../constants';

const Target = () => {
    const [target, setTarget] = useState(0);
    const [value, setValue] = useState(0);
    const [currency, setCurrency] = useState(null);
    const [accountType, setAccount] = useState(null)
     
    useEffect(() => {
        const fetchData = async () => {
            try {
                const documentSnapshot = await firebase.firestore()
                .collection('Settings')
                .doc('settings')
                .get();

                if (documentSnapshot.exists) {
                    const accTpye = documentSnapshot.data().app_acc;
                    setAccount(accTpye);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            } 
        };
        fetchData();
    }, []);

    function refresh(){
        firebase.firestore().collection('Accounts').doc(accountType).onSnapshot((querySnapshot) => {
            const Balance = querySnapshot.data().Balance;
            const Target = querySnapshot.data().target;
            const currency = querySnapshot.data().currency;
            const newValue = Balance / Target;
            setCurrency(currency);
            setTarget(Target.toString());
            setValue(newValue); 
        }); 
    }
    
    const handleButtonClick = async () => {
    const docRef = firebase.firestore().collection('Accounts').doc(accountType);
    docRef.update({
        target: parseInt(target)
        }).then(() => { 
        console.log('Document written!');
        }).catch(error => {
        console.error('Error writing document: ', error);
        });
    };

    if (accountType === null) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
                <ActivityIndicator size="large" colors={COLORS.orange}/>
                <Text style={{ fontWeight: "bold", textAlign: "center"}}>Loading Data</Text>
            </View>
        );
    }

    refresh()

    return (
        <View style={ styles.container }>
            <Text style={styles.textHeader}>Target</Text>
            
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
            <View style={styles.Tragetcontainer}>
                <Text style={styles.textTarget}>{currency}</Text>
                <TextInput 
                    defaultValue={target.toString()}
                    style={styles.input}
                    onChangeText={setTarget}
                    value={target.toString()}
                    placeholder="0"
                    keyboardType="numeric"
                /> 
            </View>
            <View style={styles.buttonLayer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleButtonClick}
                >
                    <Text style={styles.buttonText}>Set Target</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Target