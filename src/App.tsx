import React, { useEffect, useRef, useState } from 'react';
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
import { IDados } from './Interfaces';

import Login from './components/login';
import TaskList from './components/TaskList';

import { db, dbRef } from './firebaseConnection';
import { push, ref, onValue, remove, child, update, get} from 'firebase/database';

export default function App() {

  const [user, setUser] = useState<string>('');
  const [tasks, setTasks] = useState<IDados[]>([]);
  const [newTask, setNewTask] = useState('');
  const [key, setKey] = useState('');

  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
  //Visualizando as tarefas
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
    await push(ref(db, 'tarefas/' + user), {
      nome: newTask
    })
    .then(() => {
      Alert.alert("Sucesso!","Tarefa criada com sucesso!")
    })
    .catch((error) => {
      Alert.alert("Error","Não salvou")
    })
            
  
    setNewTask('')
    Keyboard.dismiss();
  }
}

  async function handleDelete(data:IDados){
  //Excluir tarefas
  await remove(child(ref(db), 'tarefas/' + user + '/' + data.key));    
  
  const findTasks = tasks.filter( item => item.key != data.key)
  setTasks(findTasks)
  
  }

  function handleEdit(data:IDados){
    setNewTask(data.nome)
    inputRef.current?.focus();
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
         ref={inputRef}
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
