import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Menu from '../menu/menu';
import { connect } from 'react-redux';
import { locaisVisitadosFetch } from '../actions/LocalizacaoActions';
import { Actions } from 'react-native-router-flux';

const style = StyleSheet.create({
    fundo: {
        backgroundColor: '#007dc4',
        flex: 1
    },
    boxLocais: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        margin: 10,
        borderWidth: 1,
        borderColor: '#000',
        elevation: 10
    },
    txtLocais: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginHorizontal: 10,
        marginVertical: 10
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

const place = require('../../img/place.png');

class Locais extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.locaisVisitadosFetch();
    }

    render() {
        return (
            <View style={style.fundo}>
                <View style={style.boxLocais}>
                    <Text style={style.txtLocais}>Locais Visitados:</Text>

                    <FlatList
                        data={this.props.locaisVisitados}
                        renderItem={({ item }) =>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        Actions.mapa({
                                            latitude: item.latitude,
                                            longitude: item.longitude
                                        })
                                    }}>
                                    <View style={style.boxContatos}>
                                        <Image source={place} style={{ width: 50, height: 50 }} />
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={style.txtUsuarioSugestao}>{item.descricaoLocal}</Text>
                                            <Text style={{ fontSize: 14, marginLeft: 20 }}>{item.data}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    />

                </View>
                <Menu menu="locais"></Menu>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    locaisVisitados: state.LocalizacaoReducer.locaisVisitados
})

export default connect(mapStateToProps, { locaisVisitadosFetch })(Locais);