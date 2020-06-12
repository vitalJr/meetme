import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';



const style = StyleSheet.create({
    fundo: {
        backgroundColor: '#eeeeee',
        flex: 1,
        justifyContent: 'center'
    },
    txtTitulo:{
        color:'#017fc1',
        fontSize:50,
        fontWeight:'bold'
    },
    boxTitulo:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:200
    }
})

class Loading extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // setTimeout(function () { Actions.login(); }, 4000);
    }


    render() {
        return (
            <View style={style.fundo}>

                <View style={style.boxTitulo}>
                    <Text style={style.txtTitulo}>MEET ME</Text>
                </View>
                <StatusBar backgroundColor='#000' />
                <Image source={require('../img/loadingInicial.gif')}
                    style={{ marginBottom: 15, alignSelf: 'center' }} />
                <Text style={{ alignSelf: 'center', fontSize: 20, color: '#F2F2F2' }}>Carregando...</Text>
            </View>
        )
    }
}

export default Loading;