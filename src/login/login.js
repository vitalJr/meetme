import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
    modificaEmail,
    modificaSenha,
    autenticarUsuario
} from '../actions/AutenticacaoAction';

const logo = require('../../img/logo.png')

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: '',
            isSigninInProgres: false
        }

    }

    componentDidMount() {
        GoogleSignin.configure({
            // scopes= ["https://www.googleapis/auth/driver.readonly"],
            webClientId: "369758478982-plkva2sqsv44ejkusegjlhue6qu61474.apps.googleusercontent.com", // client ID of type WEB for your server(needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            accountName: '', // [Android] specifies an account name on the device that should be used
        });
    };

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
            this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                alert(error.message);
                // some other error happened
            }
        }
    };

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setUserInfo(null); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };

    _renderMsgError() {

        if (this.props.autenticacaoUsuarioErro) {
            return (
                <View style={styles.boxMsgErro}>
                    <Text style={styles.msgErro}>{this.props.autenticacaoUsuarioErro}</Text>
                </View>
            )
        }
    };

    _autenticacaoUsuario() {


        let email = this.props.email;
        let senha = this.props.senha;
        this.props.autenticarUsuario(email, senha);

    }

    render() {
        return (
            <View style={styles.fundo}>

                <View style={{ marginBottom: 100, marginHorizontal: 50 }}>
                    <Text style={{ color: '#F2F2F2', fontWeight: 'bold', fontSize: 30, fontStyle: "italic" }}>
                        MEET ME
                    </Text>
                    <Text style={{ color: '#F2F2F2', fontSize: 25 }}>
                        Encontre seus amigos
                    </Text>
                </View>

                <View style={styles.boxLogin} >
                    <Image source={logo} style={styles.imgLogo} />
                    <View style={styles.boxCampos}>
                        <TextInput
                            placeholder="E-mail"
                            value={this.props.email}
                            onChangeText={(texto) => { this.props.modificaEmail(texto) }}
                            style={styles.txtCampo}
                        />
                        <TextInput
                            placeholder="Senha"
                            value={this.props.senha}
                            onChangeText={(texto) => { this.props.modificaSenha(texto) }}
                            secureTextEntry={true}
                            style={styles.txtCampo}
                        />
                    </View>

                    {this._renderMsgError()}

                    <View style={styles.boxButton}>
                        <TouchableOpacity
                            onPress={() => this._autenticacaoUsuario()}>
                            <View style={styles.bttEntrar}>
                                <Text style={styles.txtBttEntrar}>Entrar</Text>
                            </View>
                        </TouchableOpacity>

                        <GoogleSigninButton
                            style={styles.bttGoogle}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Light}
                            onPress={this.signIn}
                            disabled={this.state.isSigninInProgress} />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => Actions.cadastro()}>
                    <Text style={styles.textOpcoes}>Ainda não se registrou? Registre-se</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Actions.esqueceusenha()}>
                    <Text style={styles.textOpcoes}>Esqueceu sua senha?</Text>
                </TouchableOpacity>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    fundo: {
        backgroundColor: '#09709a',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgLogo: {
        width: 100,
        height: 100,
        position: 'absolute',
        alignSelf: 'center',
        top: -65,
        elevation: 10
    },
    boxLogin: {
        backgroundColor: "#F2F2F2",

        width: '90%',
        // marginHorizontal:10,
        // height: 300,
        borderRadius: 20,
        borderColor: '#000',
        borderWidth: 1,
        elevation: 10
    },
    boxCampos: {
        // marginVertical: 30,
        marginTop: 30,
        marginBottom: 10,
        marginHorizontal: 30
    },
    txtCampo: {
        borderWidth: 1,
        borderColor: "#000",
        marginTop: 10,
        // marginVertical: 10,
        paddingLeft: 20,
        fontSize: 15,
        color: '#000'
    },
    boxButton: {
        flexDirection: 'column',
        marginBottom: 20
    },
    bttEntrar: {
        backgroundColor: '#017fc1',
        padding: 10,
        width:192,
        alignSelf:'center',
        elevation: 10
    },
    bttGoogle: {
        width: 192,
        alignSelf: 'center',
        padding: 15,
    },
    txtBttEntrar: {
        color: "#F2F2F2",
        fontWeight: 'bold',
        fontSize: 15,
        alignSelf:'center'
    },
    textOpcoes: {
        color: '#F2F2F2',
        fontSize: 15,
        fontWeight: 'bold'
    },
    msgErro: {
        color: '#e93a1c',
        fontWeight: 'bold',
        fontSize: 18
    },
    boxMsgErro: {
        marginBottom: 15,
        alignItems: 'center'
    }

})

const mapStateToProps = state => ({

    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    autenticacaoUsuarioSucesso: state.AutenticacaoReducer.autenticacaoUsuarioSucesso,
    autenticacaoUsuarioErro: state.AutenticacaoReducer.autenticacaoUsuarioErro

})

export default connect(mapStateToProps,
    {
        modificaEmail,
        modificaSenha,
        autenticarUsuario
    })
    (Login);