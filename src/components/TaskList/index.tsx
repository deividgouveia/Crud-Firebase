import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IDados } from '../../../App';

export default function TaskList({data} : {data:IDados}) {
  return (
    <View>
      <Text>{data.nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
