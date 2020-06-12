import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import {
    modificaConfirmacaoSenha,
    modificaEmail,
    modificaNome,
    modificaSenha,
    cadastraUsuario
} from '../actions/AutenticacaoAction';


const styles = StyleSheet.create({
    fundo: {
        backgroundColor: '#09709a',
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    segundoFundo: {
        backgroundColor: '#F2F2F2',
        width: 400,
        borderWidth: 1,
        borderColor: '#000',
        elevation: 10,
        marginVertical: 10

    },
    txtCampo: {
        borderWidth: 1,
        borderColor: "#000",
        marginVertical: 10,
        paddingLeft: 20,
        fontSize: 15,
        color: '#000',
        marginHorizontal: 10
    },
    bttCadastrar: {
        backgroundColor: '#017fc1',
        padding: 10,
        marginHorizontal: 108,
        alignItems: "center",
        elevation: 10,
        marginVertical: 20
    },
    bttGoogle: {
        width: 192,
        alignSelf: 'center',
        padding: 15,
    },
    txtBttCadastrar: {
        color: "#F2F2F2",
        fontWeight: 'bold',
        fontSize: 15
    },
    txtTitulo: {
        color: '#000',
        fontSize: 23,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginHorizontal: 20,
        marginVertical: 20
    },
    msgSucesso:{
        color:'#F2F2F2',
        fontWeight:'bold',
        fontSize:18
    },
    msgErro:{
        color:'#e93b18',
        fontWeight:'bold',
        fontSize:18
    }
})

class Cadastro extends Component {

    constructor(props) {
        super(props)

        this.state = {
            msgSenhasIncorretas: ''
        }
    }

    _renderBttCadastro() {

        if (this.props.cadastroEmAndamento) {
            return (
                <ActivityIndicator size="large" />
            )
        }

        return (
            <TouchableOpacity
                onPress={() => this._cadastroUsuario()}>
                <View style={styles.bttCadastrar}>
                    <Text style={styles.txtBttCadastrar}>Cadastrar</Text>
                </View>
            </TouchableOpacity>
        )
    };

    _renderMensagemErro() {


        if (this.props.cadastroUsuarioSucesso) {
            return (
                <View>
                    <Text style={styles.msgSucesso}>{this.props.cadastroUsuarioSucesso}</Text>
                </View>
            )
        }

        if (this.props.cadastroUsuarioErro) {
            return (
                <View>
                    <Text style={styles.msgErro}>{this.props.cadastroUsuarioErro}</Text>
                </View>
            )
        }




    }

    _cadastroUsuario() {

        let nome = this.props.nome;
        let email = this.props.email;
        let senha = this.props.senha;

        this.props.cadastraUsuario({ nome, email, senha });

    }

    render() {
        return (
            <View style={styles.fundo}>
                <View style={styles.segundoFundo}>

                    <Text style={styles.txtTitulo}>Cadastre se e tenha uma experiências incríveis</Text>

                    <TextInput
                        placeholder="Nome"
                        value={this.props.nome}
                        onChangeText={(texto) => this.props.modificaNome(texto)}
                        style={styles.txtCampo}
                    />
                    <TextInput
                        placeholder="E-mail"
                        value={this.props.email}
                        onChangeText={(texto) => this.props.modificaEmail(texto)}
                        style={styles.txtCampo}
                    />
                    <TextInput
                        placeholder="Senha"
                        value={this.props.senha}
                        secureTextEntry={true}
                        onChangeText={(texto) => this.props.modificaSenha(texto)}
                        style={styles.txtCampo}
                    />
                    <TextInput
                        placeholder="Condirmação de Senha"
                        secureTextEntry={true}
                        value={this.props.confirmacaoSenha}
                        onChangeText={(texto) => this.props.modificaConfirmacaoSenha(texto)}
                        style={styles.txtCampo}
                    />

                    {this._renderBttCadastro()}
                </View>

                {this._renderMensagemErro()}

            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    nome: state.AutenticacaoReducer.nome,
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    confirmacaoSenha: state.AutenticacaoReducer.confirmacaoSenha,
    cadastroEmAndamento: state.AutenticacaoReducer.cadastroEmAndamento,
    cadastroUsuarioSucesso: state.AutenticacaoReducer.cadastroUsuarioSucesso,
    cadastroUsuarioErro: state.AutenticacaoReducer.cadastroUsuarioErro


})

export default connect(mapStateToProps, {
    modificaConfirmacaoSenha,
    modificaEmail,
    modificaNome,
    modificaSenha,
    cadastraUsuario
})(Cadastro);