import React from 'react';
import { useState, useEffect } from 'react'
import {SafeAreaView, Text, StyleSheet, TextInput, View, Platform, TouchableOpacity, Button} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS, SIZES } from '../../constants'
import { firebase } from '../../config'
import { Stack } from "expo-router";

import DateTimePicker from '@react-native-community/datetimepicker';


const Settings = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [startShow, setStartShow] = useState(false);
  const [endShow, setEndShow] = useState(false);
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)

  const account = ["PRACTICE", "REAL"]
  const [settings, setSettings] = useState([])
  const [lossCount, onLossCount] = React.useState(null);
  const [lossPerc, onLosPerc] = React.useState(null);
  const [overBougt, onOverBought] = React.useState(null);
  const [overSold, onOverSold] = React.useState(null);


  useEffect(() => {
    firebase.firestore().collection('Settings').doc('settings').onSnapshot((querySnapshot) => {
      const newSetting= [];
      const accountType =  querySnapshot.data().account;
      const countLoss =  querySnapshot.data().loss_count;
      const lossPercentage =  querySnapshot.data().loss_perc;
      const otcStartTime =  querySnapshot.data().otc_start;
      const otcEndTime =  querySnapshot.data().otc_end;
      const rsiOverBougt =  querySnapshot.data().over_bought;
      const rsiOverSold =  querySnapshot.data().over_sold;
      newSetting.push({accountType, countLoss, lossPercentage, otcStartTime, otcEndTime, rsiOverBougt, rsiOverSold })

      setSelectedValue(accountType)
      onLossCount(countLoss)
      onLosPerc(lossPercentage)
      setStartTime(otcStartTime)
      setEndTime(otcEndTime)
      onOverBought(rsiOverBougt)
      onOverSold(rsiOverSold)
      setSettings(newSetting)
   });
  }, []);

  const handleButtonClick = async () => {
    const docRef = firebase.firestore().collection('Settings').doc('settings');

    docRef.update({
        account: selectedValue,
        loss_count: parseInt(lossCount),
        loss_perc: parseInt(lossPerc),
        otc_end: endTime,
        otc_start: startTime,
        over_bought: parseInt(overBougt),
        over_sold: parseInt(overSold),
      }).then(() => {
        console.log('Document written!');
      }).catch(error => {
        console.error('Error writing document: ', error);
      });
  };

  const onStartChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setStartShow(Platform.OS == 'ios');
    setDate(currentDate);

    console.log('we are changing Start time')
    var tempDate = new Date(currentDate);
    var hour = tempDate.getHours();
    var minute = tempDate.getMinutes();

    hour = hour < 10 ? `0${hour}` : hour;
    minute = minute < 10 ? `0${minute}` : minute;

    var fTime = hour + ':' + minute + ':00'

    setStartTime(fTime)
  }

  const onEndChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setEndShow(Platform.OS == 'ios');
    setDate(currentDate);

    console.log('we are changing End time')
    var tempDate = new Date(currentDate);
    var hour = tempDate.getHours();
    var minute = tempDate.getMinutes();

    hour = hour < 10 ? `0${hour}` : hour;
    minute = minute < 10 ? `0${minute}` : minute;

    var fTime = hour + ':' + minute + ':00'

    setEndTime(fTime)
  }

  const showStartMode = (currentMode) => {
    setStartShow(true);
    setMode(currentMode);
  }

  const showEndMode = (currentMode) => {
    setEndShow(true);
    setMode(currentMode);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen
          options={{
              headerStyle: { backgroundColor: COLORS.orange },
              headerTitle: "Settings",
          }}
      />
      <Stack.Screen/>
      <View style={styles.container}>
        
        <Text style={styles.headerTitle}>Account Type : </Text>
        {settings && settings.map((doc, index) => (
          <SelectDropdown
            key={index}
            style={styles.viewContainer}
            data={account}
            onSelect={(selectedItem, index) => {
              setSelectedValue(selectedItem)
              console.log(selectedItem, index);
            }}
            defaultButtonText={doc.accountType}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            selectedRowStyle={styles.dropdown1SelectedRowStyle}
          />
        ))}
        
      </View>
      
      <View style={styles.container}>
        <Text style={styles.text}>Loss Count : </Text>
        {settings && settings.map((doc, index) => (
          <TextInput
            key={index}
            defaultValue={doc.countLoss.toString()}
            style={styles.input}
            onChangeText={onLossCount}
            value={lossCount}
            keyboardType="numeric"
          />
        ))}
        
      </View>

      <View style={styles.container}>
        <Text style={styles.text}>Loss Percentage :  -</Text>
          {settings && settings.map((doc, index) => (
            <TextInput
              key={index}
              defaultValue={doc.lossPercentage.toString()}
              style={styles.input}
              onChangeText={onLosPerc}
              value={lossPerc}
              placeholder="0"
              keyboardType="numeric"
            />
          ))}
          <Text style={styles.text}>%</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.text}>OTC Start Time : </Text>
        <TouchableOpacity onPress={() => showStartMode('time')}>
          {settings && settings.map((doc, index) => (
            <Text 
              style={styles.input}>{startTime}</Text>
          ))}
        </TouchableOpacity>
      </View>
      {startShow && (
        <DateTimePicker
          testID='startTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onStartChange}
      />)}


      <View style={styles.container}>
        <Text style={styles.text}>OTC End Time : </Text>
        <TouchableOpacity onPress={() => showEndMode('time')}>
          <Text style={styles.input}>{endTime}</Text>
        </TouchableOpacity>
      </View>

      {endShow && (
        <DateTimePicker
          testID='endTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onEndChange}
      />)}

      <View style={styles.container}>
        <Text style={styles.text}>Over Bought Line : </Text>
        {settings && settings.map((doc, index) => (
          <TextInput
            key={index}
            defaultValue={doc.rsiOverBougt.toString()}
            style={styles.input}
            onChangeText={onOverBought}
            value={overBougt}
            placeholder="0"
            keyboardType="numeric"
        />
        ))}
      </View>

      <View style={styles.container}>
        <Text style={styles.text}>Over Sold Line : </Text>
        {settings && settings.map((doc, index) => (
          <TextInput
            key={index}
            defaultValue={doc.rsiOverSold.toString()}
            style={styles.input}
            onChangeText={onOverSold}
            value={overSold}
            placeholder="0"
            keyboardType="numeric"
          />
        ))}
  
      </View>
          
      <View style={styles.submitContainer}>
        <Button color="black" title='Update Settings' onPress={handleButtonClick}/>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    marginTop: 0
  },
  container: {
    marginTop: 10,
    flexDirection: "row",
  },
  input: {
    height: 40,
    marginTop: 12,
    marginLeft: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: SIZES.small,
    textAlign: 'center'
  },
  text: {
    marginLeft: 12,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 15
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: {
    marginLeft: 12,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 15
  },
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  viewContainer: {flex: 1, width: 0, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },

  dropdown1BtnStyle: {
    width: '50%',
    marginTop: 20,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: SIZES.small,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1SelectedRowStyle: {backgroundColor: 'rgba(0,0,0,0.1)'},
  dropdown1searchInputStyleStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },

  dropdown2BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderRadius: 12,
  },
  dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2SelectedRowStyle: {backgroundColor: 'rgba(255,255,255,0.2)'},
  dropdown2searchInputStyleStyle: {
    backgroundColor: '#444',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },

  dropdown3BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: {backgroundColor: 'slategray'},
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3searchInputStyleStyle: {
    backgroundColor: 'slategray',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  submitContainer: {
    flex: 1,
    width:"100%",
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

export default Settings