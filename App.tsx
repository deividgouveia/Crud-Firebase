import React, { useEffect, useState } from 'react';
import { 
  Alert,
  FlatList,
  Keyboard,
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from 'react-native';
import { Icon } from 'react-native-elements';
import { IDados } from './src/Interfaces';

import Login from './src/components/login';
import TaskList from './src/components/TaskList';

import { db, dbRef } from './src/firebaseConnection';
import { push, ref, onValue} from 'firebase/database';

export default function App() {

  const [user, setUser] = useState<string>('');
  const [tasks, setTasks] = useState<IDados[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
     
    async function getUser() {

      if(!user){
        return;
      }
        const dadosReal = await ref(db, 'tarefas/' + user);
        onValue(dadosReal, (snapshot) => {
          if (snapshot.exists()) {
            setTasks([]);
            snapshot.forEach((chilItem) => {
              let data = {
                key: chilItem.key,
                nome: chilItem.val().nome
              };
              setTasks(oldArray => [...oldArray, data])
            })
            
          } else {
            console.log("No data available");
          }
        });

    }

    getUser();

  }, [user])

  async function handleAdd(){
  //Cadastrando Tarefa
    if(newTask === ''){
      Alert.alert("Alerta","Digite uma tarefa")
      return;
    }else{
    let tarefas = await push(ref(db, 'tarefas/' + user), {
      nome: newTask
    })
    let chave = tarefas.key;
    Alert.alert("Sucesso","Tarefa criada com sucesso!")
            
    const data = {
      key: chave,
      nome: newTask
    }; 
    
    setTasks(oldArray => [...oldArray, data])
    
    setNewTask('')
    Keyboard.dismiss();
  }
}

  function handleDelete(){
    Alert.alert("Alerta","Delete")
  }

  function handleEdit(data:IDados){
    console.log('Tarefa', data)
    Alert.alert("Alerta","Edit")
  }

  if(!user){
    return <Login changeStatus={(user) => setUser(user)}/>
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={{alignItems:'center'}}>
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>
          
      <View style={styles.containerTask}>
        <TextInput
         style={styles.input}
         placeholder='Digite a tarefa de hoje'
         value={newTask}
         onChangeText={ (text) => setNewTask(text)}
        />
        <TouchableOpacity onPress={handleAdd}>
          <Icon
            name='plus-circle'
            type='feather'
            size={40}
            style={{marginTop: 5, paddingLeft: 5}} 
            tvParallaxProperties={undefined}          
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={ (item, index) => index.toString()}
        renderItem={ ({item}) => ( 
        <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit}/> 
        )}
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
