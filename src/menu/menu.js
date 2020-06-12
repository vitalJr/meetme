import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

const style = StyleSheet.create({
    menu: {
        backgroundColor: "#F2F2F2",
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 10,
        borderRadius: 5,
        borderWidth: 1
        // borderWidth:1
    },
    iconMenu: {
        flexDirection: "column",
        alignItems: 'center',
        padding: 10
    }
})

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuColorHome: '#007dc4',
            menuColorChat: '#000',
            menuColorLocais: '#000',
            menuColorNotificacao: '#000'
        }

        this._renderMenuClicado(this.props.menu);

    }

    _renderMenuClicado(menu) {
        var state = this.state;
        if (menu == 'home') {
            state.menuColorHome = '#007dc4';
            state.menuColorChat = '#000';
            state.menuColorLocais = '#000';
            state.menuColorNotificacao = '#000';
        }

        if (menu == 'chat') {
            state.menuColorHome = '#000';
            state.menuColorChat = '#007dc4';
            state.menuColorLocais = '#000';
            state.menuColorNotificacao = '#000';
        }

        if (menu == 'locais') {
            state.menuColorHome = '#000';
            state.menuColorChat = '#000';
            state.menuColorLocais = '#007dc4';
            state.menuColorNotificacao = '#000';
        }

        if (menu == 'notificacao') {
            state.menuColorHome = '#000';
            state.menuColorChat = '#000';
            state.menuColorLocais = '#000';
            state.menuColorNotificacao = '#007dc4';
        }

        this.setState(state);
    }

    render() {
        return (
            <View style={style.menu}>
                <TouchableHighlight
                    onPress={() => { this._renderMenuClicado('home'); Actions.mapa(); }}
                    underlayColor={this.state}
                >
                    <View style={style.iconMenu}>
                        <Icon name="home" style={{ marginBottom: 5, color: this.state.menuColorHome }} size={20} color="black" />
                        <Text style={style.bttMenu}>Home</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => { this._renderMenuClicado('chat'); Actions.chat(); }}
                    underlayColor={'#F2F2F2'}
                >
                    <View style={style.iconMenu}>
                        <Icon name="chat" style={{ marginBottom: 5, color: this.state.menuColorChat }} size={20} color="black" />
                        <Text style={style.bttMenu}>Chat</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => { this._renderMenuClicado('locais'); Actions.locais() }}
                    underlayColor={'#F2F2F2'}
                >
                    <View style={style.iconMenu}>
                        <Icon name="place" style={{ marginBottom: 5, color: this.state.menuColorLocais }} size={20} color="black" />
                        <Text style={style.bttMenu}>Locais</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => { this._renderMenuClicado('notificacao'); Actions.pedidos(); }}
                    underlayColor={'#F2F2F2'}
                >
                    <View style={style.iconMenu}>
                        <Icon name="mail" style={{ marginBottom: 5, color: this.state.menuColorNotificacao }} size={20} color="black" />
                        <Text style={style.bttMenu}>Notificações</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => {
                        firebase.auth().signOut().then(() => {
                            Actions.login();
                        })
                    }}
                    underlayColor={'#F2F2F2'}
                >
                    <View style={style.iconMenu}>
                        <Icon name="close" style={{ marginBottom: 5, color: this.state.menuColorNotificacao }} size={20} color="black" />
                        <Text style={style.bttMenu}>Sair</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

}

export default Menu;