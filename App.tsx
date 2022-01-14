import React, { useEffect, useState } from 'react'
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Alert,
  FlatList
} from 'react-native'
import Listagem from './src/Listagem';
import { db, dbRef } from './src/firebaseConnection';
import { child, get, ref, push, onValue } from 'firebase/database';

export interface IDados {
  key: string | null
  nome: string
  idade: string
}

export default function App() {

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [usuarios, setUsuarios] = useState<IDados[]>([]);

//--------Ler dados e ver alterações em tempo real-----------
  useEffect(() => {

    async function dados(){
      const dadosReal = await ref(db, 'usuarios');
      onValue(dadosReal, (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          snapshot.forEach((chilItem) => {
            let data = {
              key: chilItem.key,
              nome: chilItem.val().nome,
              idade: chilItem.val().idade
            };
            setUsuarios(oldArray => [...oldArray, data])
          })
        } else {
          console.log("No data available");
        }
      });
    }

    dados();

//---------------Ler dados uma única vez---------------------    
    /*
    async function dados(){
      await get(child(dbRef, `usuarios`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          snapshot.forEach((chilItem) => {
            let data = {
              key: chilItem.key,
              nome: chilItem.val().nome,
              idade: chilItem.val().idade
            };
            setUsuarios(oldArray => [...oldArray, data])
          })
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }

    dados();  
    */
 
  },[])
  

//--------------------Salvar Dados---------------------//

  async function salvar() {
    if(nome != "" && idade != ""){
     let usuarios = await push(ref(db, 'usuarios/'), {
          nome: nome,
          idade: idade
        });  
      Alert.alert("Sucesso!","Cadastrado com sucesso!")
    }else{
      Alert.alert("Error!","Erro ao cadastrar!")
    }
    setNome("");
    setIdade("");
  }
  
//-----------------Atualizar Dados----------------------//

  async function atualizar() {
    
  }

//-------------------Excluir Dados--------------------//

  async function excluir() {

  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={{marginTop:25, alignItems: "center"}}>
        <Text style={styles.titulo}>CRUD FIREBASE</Text>
          <TextInput
            style={[styles.input, {marginBottom:10}]} 
            underlineColorAndroid="transparent"
            value={nome}
            onChangeText={(texto) => setNome(texto)}
            placeholder="Digite seu nome"       
          />
          <TextInput
            style={styles.input}
            value={idade}
            onChangeText={(texto) => setIdade(texto)}
            placeholder="Digite sua idade"
            keyboardType="numeric"
          />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity 
          style={[styles.botao, {backgroundColor:"#1d75cd"}]}
          onPress={salvar}
        >
          <Text style={styles.botaoText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.botao, {backgroundColor:"#1d75cd"}]}
          onPress={atualizar}
        >
          <Text style={styles.botaoText}>Atualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.botao, {backgroundColor:"#1d75cd"}]}
          onPress={excluir}
        >
          <Text style={styles.botaoText}>Excluir</Text>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={usuarios} 
        renderItem={ ({item}) => ( <Listagem data={item}/> ) }
        />
      </View>
  </SafeAreaView>   
        
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  input:{
    backgroundColor:"#ffffff",
    borderRadius:10,
    borderWidth:1,
    width: "90%",
    padding: 10
  },
  botao:{
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginTop: 15
  },
  botaoText:{
    fontWeight: "bold",
    fontSize: 22,
    color: "#ffffff"
  },
  titulo:{
    fontSize:30,
    color: "#000000",
    marginBottom: 25
  },
  areaBtn:{
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-around"
  }
})