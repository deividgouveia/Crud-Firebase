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
  const [eye, setEye] = useState(true);
  const [type, setType] = useState('login');
  const [inputvazio, setInputvazio] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const auth = getAuth(app);

  function handleButton(){

    if(email == "" || password == ""){
      setInputvazio(true)
      setTitleError(false)
    }else{
      if(type === 'login'){
      //Aqui fazemos o login

        const user = signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((error) => {
          console.log(error);
          //Alert.alert("Error","Usuário ou senha incorretos.");
          setInputvazio(true);
          setTitleError(true);
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

  function handleTextEmail(text:string){
     setEmail(text);
     setInputvazio(false);
  }
  function handleTextPassword(text:string){
    setPassword(text);
    setInputvazio(false);
  }
  
  const Dadosvazio = () => {
     return(
      <View style={{
        flexDirection:'row', 
        justifyContent:'center',
        marginBottom: 10
        }}>
        <Icon
          name='alert-circle'
          type='feather'
          color='#ff0000'
          size={20} 
          tvParallaxProperties={undefined}               
        />
        <Text style={{fontSize:15, color:'#ff0000', marginLeft:5}}>
          {titleError === false ? 'Preencha os dados.' : 'Usuário ou senha incorretos.'}
          
          </Text>
        </View>
     );
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
            onChangeText={handleTextEmail} 
            leftIcon={{
              type:'feather',
              name:'mail'
            }}
            autoCompleteType={undefined}            
            />

            <Input 
            placeholder="Digite sua senha"
            value={password}
            onChangeText={handleTextPassword}
            leftIcon={{
              type:'feather',
              name:'lock'
            }}     
            rightIcon={
              <Icon 
               name={eye === true ? 'eye-off' : 'eye'}
               type='feather'
               onPress={ () => setEye(eye => eye === true ? false : true)}
               tvParallaxProperties={undefined}               
              />
            }
            secureTextEntry={eye} 
            autoCompleteType={undefined}            
            />
          
            {inputvazio === false ? null : <Dadosvazio/>}

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
