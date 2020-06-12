import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';

import { connect } from 'react-redux';
import { modificaMensagem, enviarMensagem, conversaUsuarioFetch } from '../actions/ChatActions';


const style = StyleSheet.create({
    textInput: {
        height: 60,
        fontSize: 15,
    },
    container: {
        flex: 1,
        // paddingTop: 22
    },
    item: {
        // padding: 5,
        fontSize: 18,
        // height: 44,
    },
})

class Conversa extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.conversaUsuarioFetch(this.props.contatoEmail);
    }

    _enviaMensagem() {

        var mensagem = this.props.mensagem;
        var contatoNome = this.props.contatoNome;
        var contatoEmail = this.props.contatoEmail;

        this.props.enviarMensagem(mensagem, contatoNome, contatoEmail);

    }

    renderMensagemUsuario(item) {

        if (item.tipo === 'e') {
            return (
                <View style={{ alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40 }}>
                    <Text style={{
                        fontSize: 18,
                        color: '#000',
                        padding: 10,
                        backgroundColor: '#007dc4',
                        borderRadius: 50,
                        elevation: 10
                    }}>{item.mensagem}</Text>
                </View>
            );
        }

        return (
            <View style={{ alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40 }}>
                <Text style={{
                    fontSize: 18,
                    color: '#000',
                    padding: 10,
                    backgroundColor: '#FFF',
                    borderRadius: 50,
                    elevation: 10
                }}>{item.mensagem}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#007dc4', padding: 10 }}>
                <View style={{
                    flex: 1, paddingBottom: 20,
                    backgroundColor: '#F2F2F2',
                    borderWidth: 1,
                    borderRadius: 10,
                    elevation: 1,
                    padding: 10
                }}>

                    <FlatList
                        data={this.props.conversa}
                        renderItem={({ item }) =>
                            this.renderMensagemUsuario(item)
                        }
                    />

                </View>

                <View style={{ flexDirection: 'row', height: 60, marginTop: 10 }}>
                    <TextInput
                        value={this.props.mensagem}
                        onChangeText={texto => this.props.modificaMensagem(texto)}
                        style={{ flex: 4, backgroundColor: '#FFF', fontSize: 18, borderWidth: 1, borderRadius: 10, elevation: 1 }}
                    />
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#007dc4"
                        onPress={() => { this._enviaMensagem() }}>
                        <Image source={require('../../img/send.png')} style={{ width: 50, height: 50, elevation: 1 }} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    mensagem: state.ChatReducer.mensagem,
    conversa: state.ChatReducer.conversa
})


export default connect(mapStateToProps, {
    modificaMensagem,
    enviarMensagem,
    conversaUsuarioFetch
})(Conversa);