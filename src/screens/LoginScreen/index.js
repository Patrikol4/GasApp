import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image, ImageBackground
} from 'react-native';
import Input from './Input';
import Button from './Button';
import todayImage from '../../assets/logo.jpg'
//import LoginProcess from './LoginProcess'
import auth from '@firebase/auth'
import firebase from '@firebase/app'


const style = StyleSheet.create({
  container: {
    flex: 3,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  wrapper: {
    padding: 14,
    justifyContent: 'center',
    backgroundColor: '#fff',
    
  },
  background: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    padding: '25%',
    marginHorizontal: 10,
    marginBottom: 5,
    marginLeft: 95,
    marginRight: 95,
    resizeMode: 'contain',
    
    
  
  },
  btnTextForgot: {
    fontWeight: 'bold',
           
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 20,
  },
  btnLogin: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ggBtn: {
    flexDirection: 'row',
  },
});






export class LoginScreen extends React.Component {


// Metodo construtor
constructor(props){
  super(props)

  this.state = {
    email: '',
    password: '',
    isLoading: false,
    message: ''
  }
}
// metodo onChangeEmail
onChangeEmail(email) {
  this.setState({
    email
  })
}
// metodo   onChangePass
onChangePassword(password) {
  this.setState({
    password
  })
}

// componentDidMount (caso precise no futuro)

componentDidMount() {

  var firebaseConfig = {
    apiKey: "AIzaSyC0MfRBvmCa7ZjDhn6lh633mgW4HPcpEmQ",
    authDomain: "demonstracao-firebase-ap-ea625.firebaseapp.com",
    databaseURL: "https://demonstracao-firebase-ap-ea625.firebaseio.com",
    projectId: "demonstracao-firebase-ap-ea625",
    storageBucket: "demonstracao-firebase-ap-ea625.appspot.com",
    messagingSenderId: "56689347197",
    appId: "1:56689347197:web:0490731f6916bd88c23f14"
  };
  // Initialize Firebase
    if(!firebase.length){
  firebase.initializeApp(firebaseConfig);
    }

  // Initialize Firebase

};

// onChangeHandler

onChangeHandler(field, value){
  this.setState({
    [field]: value
  });

}

// trylogin

tryLogin() {
  this.setState({isLoading: true, message: ''})
  const { email, password } = this.state;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
    this.setState({ message: 'Sucesso'})
    console.log('Logado');
    })
    .catch(error => {
      this.setState({ message: this.getMessageByErrorCode(error.code) })
     
    })
    .then(() => this.setState({ isLoading: false }))
  }

  // getMessageByErrorCode

  getMessageByErrorCode(errorCode) {
    switch (errorCode) {
      case "auth/wrong-password":
        return 'Senha Incorreta'
        // code...
        break;

    case "auth/user-not-found":
      return 'Usuario nao encontrado'
      break;
      
      default:
        return 'Erro desconhecido'
        
    }

  }

  // renderButton (botao de loguin)

  renderButton(){
    if(this.state.isLoading)
      return (
      
      <Text>Carregando..</Text>);


    return (
      <Button style={style.btnLogin}
        title="Entrar"
        onPress={() => this.tryLogin()} />
    );

  }

  // renderMessage

  renderMessage(){
    const { message } = this.state;
    if(!message)
      return null

    return (
      <View>
        <Text>{message}</Text>
      </View>
      )

    }
  // trySignUp  registro

  trySignUp(){
    this.setState({isLoading: true, message: ''})
    const { email, password } = this.state;
    
    firebase
    .auth()
.createUserWithEmailAndPassword(email, password)
.then(() => {
  console.log('Conta de usuario criada com sucesso!');
})
.catch(error => {
  if (error.code === 'auth/email-already-in-use') {
    console.log('Esse email ja esta sendo utilizado!');
  }

  if (error.code === 'auth/invalid-email') {
    console.log('Esse endereco de email e invalido!');
  }

  console.error(error);
});
    
  }



  // RenderBtnSign (renderizacao do botao de criar conta)
  renderBtnSign(){
    if(this.state.isLoading)
      return (
      
      <Text>Carregando..</Text>);


    return (
      <Button
        title="Criar Conta"
        onPress={() => this.trySignUp()} />
    );
  }

  render(){
  return (
    <SafeAreaView style={style.container}>
      <View style={style.wrapper}>
         <ImageBackground  source={todayImage} style={style.background}>
         </ImageBackground>
        <View>
          <Input placeholder={'Email'}
          value={this.state.email}
          onChangeText={value => this.onChangeHandler('email',value)} />
          <Input placeholder={'Senha'} secureTextEntry
          value={this.state.password}
          onChangeText={value => this.onChangeHandler('password',value) }
          />
        </View>
        <View style={style.forgotContainer}>
          <TouchableOpacity>
            <Text style={style.btnTextForgot}>Esqueceu a Senha ?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={style.btnLogin}>
          <Text>{this.renderButton()}</Text>
        </TouchableOpacity>
        <Text style={{textAlign: 'center', padding: 20}}>OU</Text>
        <View style={style.ggBtn}>
          <Button
            title="Google"
            icon={require('../../assets/googleIcon.png')}
          />
          <Button
            title="Facebook"
            icon={require('../../assets/fbIcon.png')}
            color={'#4a6ea8'}
            textColor="#fff"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text>Ainda não é um membro  </Text>
          <View>
          <TouchableOpacity>
            <Text style={style.btnTextForgot }>{this.renderBtnSign()}</Text>
          </TouchableOpacity>
          </View>

          <View style={{ alignContent: 'center', textAlign: 'center'}}>{this.renderMessage()}</View>

        </View>
      </View>
    </SafeAreaView>
  );
};}

export default LoginScreen;