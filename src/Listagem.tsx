import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IDados } from '../App'

export default function Listagem({data} : {data: IDados}) {
  return (
    <View>
      <Text>{data.nome}</Text>
      <Text>{data.idade}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
