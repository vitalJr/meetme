import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { pedidosUsuarioFetch, aceitarPedido, recusarPedido } from '../actions/ChatActions';
import Menu from '../menu/menu';


const style = StyleSheet.create({
    fundo: {
        backgroundColor: "#007dc4",
        flex: 1
    },
    boxListaNotificacao: {
        backgroundColor: '#F2F2F2',
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        borderColor: '#000',
        borderWidth: 1,
        elevation: 10
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
        fontSize: 18
    },
    txtNotificacao: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 10
    },
    bttSolicitacao: {
        backgroundColor: '#007dc4',
        padding: 5,
        color: '#F2F2F2',
        fontWeight: 'bold',
        marginRight: 5
    }

});

const usuario = require('../../img/usuario.png');

class Pedidos extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.pedidosUsuarioFetch();
    }

    render() {
        return (
            <View style={style.fundo}>
                <View style={style.boxListaNotificacao}>
                    {this.props.listaPedidosUsuario.length > 0 &&
                        <Text style={style.txtNotificacao}>Te enviou solicitação:</Text>}
                    <FlatList
                        data={this.props.listaPedidosUsuario}
                        renderItem={({ item }) =>
                            <View>
                                <TouchableOpacity
                                    onPress={() => this.props.enviarPedidoContatoEmail(item.email)}>
                                    <View style={style.boxContatos}>
                                        <Image source={usuario} style={{ width: 50, height: 50 }} />
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={style.txtUsuarioSugestao}>{item.nome}</Text>
                                            <Text style={{ fontSize: 14, marginLeft: 20, }}>{item.email}</Text>
                                            <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 10 }}>
                                                <TouchableOpacity
                                                    onPress={() => { this.props.aceitarPedido(item, item.uid) }}>
                                                    <Text style={style.bttSolicitacao}>Aceitar</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => { this.props.recusarPedido(item.uid) }}>
                                                    <Text style={style.bttSolicitacao}>Recusar</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                </View>

                <Menu menu="notificacao"></Menu>
            </View>
        )
    }

}

const mapStateToProps = state => ({
    listaPedidosUsuario: state.ChatReducer.listaPedidosUsuario
})

export default connect(mapStateToProps, { pedidosUsuarioFetch, aceitarPedido, recusarPedido })(Pedidos);