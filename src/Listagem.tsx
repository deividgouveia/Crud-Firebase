import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Listagem({data} : {data: any}) {
  return (
    <View>
      <Text>{data.nome}</Text>
      <Text>{data.idade}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
