import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { IDados } from '../../Interfaces';

export default function TaskList({data, deleteItem, editItem} : {
  data:IDados, deleteItem:Function, editItem:Function
}) {
  return (
    <View style={styles.container}>
      
      <View style={{paddingRight: 10}}>
        <TouchableWithoutFeedback onPress={() => editItem(data)}>
          <Text style={styles.text}>{data.nome}</Text>
        </TouchableWithoutFeedback>
      </View>

      <TouchableOpacity onPress={() => deleteItem(data)}>
        <Icon 
          name='trash-2'
          type='feather'
          color='#fff'
          tvParallaxProperties={undefined}         
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'center',
    marginBottom: 10,
    padding: 12,
    borderRadius: 20,
    justifyContent: 'space-between'
  },
  text:{
    color:'#fff',
    paddingRight: 10, 
    fontSize: 15
  }
});
