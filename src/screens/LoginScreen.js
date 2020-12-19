import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useKeyboard} from '@react-native-community/hooks';
import {EmailSchema, PasswordSchema} from '../utils/Validation';
import {TextInput, Title, Subheading} from 'react-native-paper';
import {GlobalTheme, Button, GenericView, Divider} from '../components';
import {useDispatch} from 'react-redux';
import {loginApi} from '../redux/actions/Login';
import {DNInput} from '../components/common/DNInput';
import LottieView from 'lottie-react-native';
import {formBody} from '../utils/FormBody';

const Login = (props) => {
  const keyboard = useKeyboard();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValidate, setEmailValidate] = useState(false);
  const [passwordValidate, setPasswordValidate] = useState(false);
  const dispatch = useDispatch();

  const _toast = () => {
    ToastAndroid.show('Will available soon', 1500);
  };

  const loginHandler = async () => {
    const validEmail = await EmailSchema.isValid({email: email});
    validEmail ? setEmailValidate(false) : setEmailValidate(true);
    const validPassword = await PasswordSchema.isValid({password: password});
    validPassword ? setPasswordValidate(false) : setPasswordValidate(true);
    if (validEmail && validPassword) {
      let obj = {
        email: email,
        password: password,
        role: 'general_user',
      };
      dispatch(loginApi(formBody(obj), obj, true));
    }
  };
  const input = React.useRef();

  // console.warn('key ==> ', keyboard);

  return (
    <GenericView modalLoading showHeader={false}>
      <View style={styles.appView}>
        {/* APP LOGO */}
        {/* Login Wrapper */}
        <View style={styles.lottieView}>
          <LottieView source={require('../assets/start.json')} autoPlay loop />
        </View>
        <View style={styles.formWrapper}>
          {/* LOGIN FORM GOES HERE */}
          <View style={styles.textLeft}>
            <Title style={{fontSize: 30}}>Login</Title>
          </View>

          <Divider medium />
          <View style={{width: '90%', alignSelf: 'center'}}>
            <DNInput
              onSubmitEditing={() => {
                input.current.focus();
              }}
              left={
                <TextInput.Icon
                  style={{minWidth: 50}}
                  name="account"
                  color={GlobalTheme.darkBlueColor}
                />
              }
              blurOnSubmit={false}
              label="Email"
              icon="user"
              // style={styles.mt30}
              title="Email"
              value={email}
              hasError={emailValidate}
              onChangeText={(email) => {
                setEmail(email);
                setEmailValidate(false);
              }}
            />

            <Divider big />

            <DNInput
              mref={input}
              left={
                <TextInput.Icon name="lock" color={GlobalTheme.darkBlueColor} />
              }
              label="Password"
              isPassword
              icon="lock"
              // style={styles.mt20}
              secureTextEntry
              title="Password"
              value={password}
              hasError={passwordValidate}
              onChangeText={(password) => {
                setPassword(password);
                setPasswordValidate(false);
              }}
            />
          </View>
          {/* <TouchableOpacity
            onPress={() => _toast()}
            style={{alignSelf: 'flex-end', right: '5%', marginTop: '3%'}}>
            <Subheading>Forgot Password?</Subheading>
          </TouchableOpacity> */}
          <Button
            margined
            mode={'outlined'}
            style={styles.buttonStyle}
            onPress={loginHandler}>
            Login
          </Button>
          <Divider medium />
          <Divider medium />
        </View>
      </View>
    </GenericView>
  );
};
const styles = StyleSheet.create({
  lottieView: {
    alignSelf: 'center',
    width: '60%',
    height: 300,
  },
  bgStyle: {
    height: '100%',
    width: '100%',
  },
  appView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: GlobalTheme.background,
  },

  textLeft: {
    alignItems: 'flex-start',
    width: '90%',
    alignSelf: 'center',
  },
  logoSize: {height: 130, width: 130, resizeMode: 'contain'},
  footerSize: {
    height: 50,
    width: 110,
    resizeMode: 'contain',
    bottom: 5,
  },
  logoWrapper: {
    marginBottom: '0%', //Set as per logo scale
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
    // backgroundColor: 'blue',
  },
  formWrapper: {
    width: '100%',
    alignItems: 'center',
    // flex: 0.7,
  },
  footerLogoWrapper: {
    // marginTop: '30%',
  },
  fingerprint: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  mt30: {
    marginTop: 30,
  },
  mt20: {
    marginTop: 20,
  },
  buttonStyle: {
    marginTop: '5%',
    alignSelf: 'center',
  },
  wholePage: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
    borderRadius: GlobalTheme.viewRadius,
    // paddingHorizontal: 10,
  },
  contentPart: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: GlobalTheme.whiteColor,
    // height: '50%',
    marginBottom: '15%',
    padding: '5%',
    justifyContent: 'center',
    borderRadius: GlobalTheme.viewRadius,
  },
  icons: {
    alignSelf: 'center',
  },
});

export {Login as LoginScreen};
