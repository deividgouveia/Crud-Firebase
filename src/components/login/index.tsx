import React, { useState } from 'react';
import { 
  Alert,
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from 'react-native';

import { Input, Icon, Button } from 'react-native-elements';

import { ILogin } from '../../Interfaces';

export default function Login() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  

  function handleLogin(){
    Alert.alert("Error","Preencha os dados")
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
            style={styles.input}
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
            style={styles.input}
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
              title='Acessar'
              titleStyle={{fontWeight: 'bold', fontSize: 20}}
              loading={false}
              buttonStyle={styles.botton}
              onPress={handleLogin}
            />
        </View>
      
      

      <TouchableOpacity>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>Criar uma conta</Text>
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
  input:{
    backgroundColor: '#ffffff',
    borderRadius: 0,
    borderColor: "#000",
    borderWidth: 0
  },
  botton:{
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#000',
    marginTop: 15,
  },
  
});
