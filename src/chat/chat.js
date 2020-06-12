import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Tab, Tabs } from 'native-base';

import Menu from '../menu/menu';
import Adicionar from './adicionar';
import { connect } from 'react-redux';
import { contatosFetch, contatoUsuarioFetch, conversasUsuarioFetch } from '../actions/ChatActions'
import Contato from './contato';
import Conversas from './conversas';



const style = StyleSheet.create({
    fundo: {
        backgroundColor: '#F2F2F2',
        flex: 1
    },
    topo: {
        backgroundColor: '#5458af',
        elevation: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    texto: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 20
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

class Chat extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.contatosFetch();
        this.props.contatoUsuarioFetch();
        this.props.conversasUsuarioFetch();
    }

    render() {
        return (
            <View style={style.fundo}>
                <Container>
                    <Tabs initialPage={0} >
                        <Tab heading="Conversas">
                            <View style={[style.container, { backgroundColor: '#F2F2F2' }]}>
                                <Conversas></Conversas>
                            </View>
                        </Tab>
                        <Tab heading="Contato">
                            <View style={[style.container, { backgroundColor: '#F2F2F2' }]}>
                                <Contato></Contato>
                            </View>
                        </Tab>
                        <Tab heading="Adicionar">
                            <View style={[style.container, { backgroundColor: '#F2F2F2' }]}>
                                <Adicionar></Adicionar>
                            </View>
                        </Tab>
                    </Tabs>
                </Container>
                <Menu menu="chat"></Menu>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
    contatosFetch,
    contatoUsuarioFetch,
    conversasUsuarioFetch
})(Chat);