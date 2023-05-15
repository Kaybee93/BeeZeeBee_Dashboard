import { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { firebase } from '../config'
import { COLORS, icons } from '../constants'
import { ScreenHeaderBtn, TradeView, DailyReport, Target} from '../components'
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Home = () => {
    const router = useRouter();

    const [isPress, setIsPress] = useState(null);

    useEffect(() => {
        firebase.firestore().collection('Settings').doc('settings').onSnapshot((querySnapshot) => {
            const isTrade =  querySnapshot.data().trade;
            setIsPress(isTrade)
       });
      },[]);

    const handleButtonClick = async () => {
        const docRef = firebase.firestore().collection('Settings').doc('settings');
        docRef.update({
            trade: !isPress,
          }).then(() => {
            console.log('Document written!');
          }).catch(error => {
            console.error('Error writing document: ', error);
          });
      };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.orange },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn 
                            iconUrl={isPress === true? icons.stop : icons.start} 
                            dimension="80%" 
                            handlePress={handleButtonClick}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.settings} 
                            dimension="60%"  
                            handlePress={() => router.push(`/settings/settings`)}/>
                    ),
                    headerTitle: "BeeZeeBee",
                    headerTitleAlign: "center"
                }}
            />
            <Stack.Screen   />

            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
            
                    if (route.name === 'Trades') {
                        iconName = focused ? 'trending-up' : 'trending-up-outline';
                    } else if (route.name === 'Daily Report') {
                        iconName = focused ? 'receipt' : 'receipt-outline';
                    } else if (route.name === 'Target') {
                        iconName = focused ? 'disc' : 'disc-outline';
                    }
            
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: 'orange',
                tabBarStyle: { backgroundColor: 'black' },
            })}>
                <Tab.Screen name="Trades" component={TradeView} />
                <Tab.Screen name="Daily Report" component={DailyReport} />
                <Tab.Screen name="Target" component={Target} />
            </Tab.Navigator>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tabIndicator: {
      backgroundColor: 'orange', // set the active indicator color here
      height: 3,
    },
    tabBar: {
        backgroundColor: 'black',
    }
  });
export default Home