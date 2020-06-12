import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { modificaEmailUsuario, enviarPedidoContatoEmail } from '../actions/ChatActions';
import { State } from 'react-native-gesture-handler';

const style = StyleSheet.create({
    fundo: {
        backgroundColor: "#007dc4",
        flex: 1
    },
    boxTxtInputEmail: {
        backgroundColor: '#F2F2F2',
        marginVertical: 10,
        marginHorizontal: 10,
        borderColor: '#000',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',

    },
    txtInput: {
        color: '#000',
        paddingLeft: 10,
        fontSize: 15
    },
    boxSugestao: {
        marginHorizontal: 10
    },
    txtSugestao: {
        color: '#F2F2F2',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6
    },
    boxContatos: {
        backgroundColor: '#F2F2F2',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtUsuarioSugestao: {
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 15
    }
})

const usuario = require('../../img/usuario.png');
const send = require('../../img/send.png');

class Adicionar extends Component {

    constructor(props) {
        super(props);
    }

    _enviarPedidoUsuario() {
        let email = this.props.emailUsuarioAdicionar;
        this.props.enviarPedidoContatoEmail(email);
    }

    _renderMensagem() {

        if (this.props.msgPedidoEnviadoErro) {
            return (
                <Text style={{
                    color: '#cd1d2e',
                    fontWeight: 'bold',
                    fontSize: 20,
                    alignSelf: 'center'
                }}>{this.props.msgPedidoEnviadoErro}</Text>
            )
        }

        if (this.props.msgPedidoEnviadoSucesso) {
            return (
                <Text style={{
                    color: '#F2F2F2',
                    fontWeight: 'bold',
                    fontSize: 20,
                    alignSelf: 'center'
                }}>{this.props.msgPedidoEnviadoSucesso}</Text>
            )
        }

    }

    render() {
        return (
            <View style={style.fundo}>
                <View style={style.boxTxtInputEmail}>
                    <TextInput
                        placeholder="Informe o e-mail do usuário"
                        value={this.props.emailUsuarioAdicionar}
                        onChangeText={(texto) => { this.props.modificaEmailUsuario(texto) }}
                        onSubmitEditing={() => { this._enviarPedidoUsuario() }}
                        style={style.txtInput} />
                </View>

                <View style={style.boxSugestao}>
                    <Text style={style.txtSugestao}>Sugestões</Text>
                </View>

                <View style={{
                    backgroundColor: '#F2F2F2',
                    margin: 10,
                    borderWidth: 1,
                    elevation: 10,
                    maxHeight: 380,
                }}>
                    <FlatList
                        data={this.props.listaContatos}
                        renderItem={({ item }) =>
                            <View>
                                <TouchableOpacity
                                    onPress={() => this.props.enviarPedidoContatoEmail(item.email)}>
                                    <View style={style.boxContatos}>
                                        <Image source={usuario} style={{ width: 50, height: 50 }} />
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={style.txtUsuarioSugestao}>{item.nome}</Text>
                                            <Text style={{ fontSize: 14, marginLeft: 20, }}>{item.email}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                </View>

                {this._renderMensagem()}

            </View>
        );
    }

}

const mapStateToProps = (state) => ({
    emailUsuarioAdicionar: state.ChatReducer.emailUsuarioAdicionar,
    listaContatos: state.ChatReducer.listaContatos,
    msgPedidoEnviadoSucesso: state.ChatReducer.msgPedidoEnviadoSucesso,
    msgPedidoEnviadoErro: state.ChatReducer.msgPedidoEnviadoErro,
})

export default connect(mapStateToProps, {
    modificaEmailUsuario, enviarPedidoContatoEmail
})(Adicionar);