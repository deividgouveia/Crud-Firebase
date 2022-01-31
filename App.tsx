import React, { useState } from 'react';
import { 
  FlatList,
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from 'react-native';
import { Icon } from 'react-native-elements';

import Login from './src/components/login';
import TaskList from './src/components/TaskList';

interface IDados{
  key: number
  nome: string
}

let tasks = [
  {key: 1, nome:"Comprar cerbeja"},
  {key: 2, nome:"Fazer churrasco"}
]

export default function App() {

  const [user, setUser] = useState<string>('');
 
  const [newTask, setNewTask] = useState('');

  if(!user){
    return <Login changeStatus={(user) => setUser(user)}/>
  }

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Minhas Tarefas</Text>
      
      <View style={styles.containerTask}>
        <TextInput
         style={styles.input}
         placeholder='Digite a tarefa de hoje'
         value={newTask}
         onChangeText={ (text) => setNewTask(text)}
        />
        <TouchableOpacity>
          <Icon
            name='plus-circle'
            type='feather'
            size={50} 
            tvParallaxProperties={undefined}          
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={ (item, index) => index.toString()}
        renderItem={ ({item}) => ( <TaskList data={item}/> )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    alignItems: 'center'
  },
  containerTask:{
    flexDirection: 'row'
  },
  input:{
    flex: 1,
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 20,
    fontSize: 20
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20
  },
});
