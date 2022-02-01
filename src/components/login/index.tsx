import React, { useState } from 'react';
import { 
  Alert,
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';

console.disableYellowBox=true;

import { app } from '../../firebaseConnection';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';

import { Input, Icon, Button } from 'react-native-elements';

export default function Login({changeStatus} : {changeStatus(user:string):void}) {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('login');

  const auth = getAuth(app);

  function handleButton(){

    if(email == "" || password == ""){
      Alert.alert("Error","Preencha os dados")
    }else{
      if(type === 'login'){
      //Aqui fazemos o login

        const user = signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Error","Usuário ou senha incorretos.");
          setLoading(false);
          return;
        })  

        setLoading(true)
      }else{
      //Aqui cadastramos o usuario 
      
        const user = createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Error","Ops algo está errado!");
          setLoading(false);
        })

        setLoading(true)
      }
      
    }
  }    

  return (
    
    <SafeAreaView style={styles.container}>

      <Icon 
        name='clipboard'
        type='feather'
        color='#000000'
        size={80}
        tvParallaxProperties={undefined}       
      />

        <View style={styles.inputArea}>
            <Input 
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={(text) => setEmail(text)} 
            leftIcon={{
              type:'feather',
              name:'mail'
            }}
            autoCompleteType={undefined}            
            />

            <Input 
            placeholder="Digite sua senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            leftIcon={{
              type:'feather',
              name:'lock'
            }}
            secureTextEntry={true} 
            autoCompleteType={undefined}            
            />

            <Button 
              title={type === 'login' ? 'Acessar' : 'Cadastrar'}
              titleStyle={{
                fontWeight: 'bold',
                fontSize: 20,
                color: type === 'login' ? '#fff' : '#000'
              }}
              loading={loading}
              loadingProps={{
                size:25,
                color: type === 'login' ? '#fff' : '#000'
              }}
              buttonStyle={[styles.botton, {
                backgroundColor: type === 'login' ? '#000' : '#fff',
                borderColor: type === 'login' ? '#000' : '#000',
                borderWidth: type === 'login' ? 2 : 2
              }]}
              onPress={handleButton}
            />
        </View>
      
      <TouchableOpacity 
      onPress={ () => setType(type => type === 'login' ? 'cadastrar' : 'login')}
      >
        <Text style={{fontWeight: 'bold', fontSize: 15,color: '#000'}}>
          {type === 'login' ? 'Criar uma conta' : 'Já sou cadastrado'}
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  inputArea:{
    width: '100%',
    padding: 40
  },
  botton:{
    borderRadius: 20,
    padding: 10,
    marginTop: 15,
  },
  
});
