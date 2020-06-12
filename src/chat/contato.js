import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { contatoUsuarioFetch } from '../actions/ChatActions';
import { Actions } from 'react-native-router-flux';



const style = StyleSheet.create({
    fundo: {
        backgroundColor: "#007dc4",
        flex: 1
    },
    boxContatos: {
        backgroundColor: '#F2F2F2',
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        borderColor: '#000',
        borderWidth: 1,
        elevation: 10
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

class Contato extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={style.fundo}>
                <View style={style.boxContatos}>
                    <FlatList
                        data={this.props.listContatoUsuario}
                        renderItem={({ item }) =>
                            <View>
                                <TouchableOpacity
                                    onPress={() => Actions.conversa({
                                        title: item.nome,
                                        contatoNome: item.nome,
                                        contatoEmail: item.email
                                    })}>
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
            </View>
        )
    }
}

const mapStateToProps = state => ({
    listContatoUsuario: state.ChatReducer.listaContatoUsuario
})

export default connect(mapStateToProps, { contatoUsuarioFetch })(Contato);