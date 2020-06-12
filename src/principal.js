import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import MapView, { Marker } from 'react-native-maps';


const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2'
    },
    mapa: {
        width: '100%',
        height: 500,
        marginTop: 20
    },
    viewMarker: {
        height: 40,
        width: 40
    },
    textMarker: {
        color: '#FFF'
    }
})



class Principal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            region: null
            // markers: [
            //     { key: 0, image: require('../img/carro.png'), coord: { latitude: -23.5492243, longitude: -46.5813785 }, title: "Meu carro" },
            //     { key: 1, image: require('../img/carro.png'), coord: { latitude: -23.5772243, longitude: -46.59143985 }, title: "Minha casa" },
            //     { key: 1, image: require('../img/carro.png'), coord: { latitude: -23.5982243, longitude: -46.59145585 }, title: "Casa da minha mãe" }
            // ]
        }
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(
            (position) => {
                var state = this.state;
                state.region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }

                this.setState(state);
                
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    mudouMapa(region) {
        var state = this.state;
        state.latitudeAtual = region.latitude
        state.region = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
        this.setState(state);
    }

    clicouMapa(region) {
        alert('Latitude: ' + region.nativeEvent.coordinate.latitude + "\nLogitude: " +
            region.nativeEvent.coordinate.longitude);
    }

    adicionarMarcador(event) {
        var state = this.state;

        state.markers.push({
            key: state.markers.length,
            coord: {
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude
            },
            title: "teste " + state.markers.length,
            pinColor: "red"
        })

        this.setState(state);
    }


    render() {
        const { region, markers } = this.state;
        return (
            <View style={style.container}>
                {/* <Text>Latitude Atual: {region.latitude}</Text>
                <Text>Longitude Atual: {region.longitude}</Text> */}
                <MapView
                    // Quando o mapa está todo carregado é chamado este evento;
                    // onMapReady={() => { }}
                    // Pega a ação de quando arrastar com o dedo e soltar;
                    // onRegionChangeComplete={(region) => { this.mudouMapa(region) }}
                    // evento de clique que chame uma função
                    // onPress={(region) => { this.adicionarMarcador(region); }}
                    style={style.mapa}
                    region={region}
                // Tipos de mapa: standard / satellite / hybrid
                // mapType="hybrid"
                // Arrastar o mapa para os lados: ativar e desativalo
                // scrollEnabled={false}
                // Habilitar e desativar o zoom
                // zoomEnabled={false}
                // rotacionar o mapa
                // rotateEnabled={false}
                // visualizar o trafego das vias
                // showsTraffic={true}
                >
                    {/* {markers.map((marker) => {
                        return (
                            <Marker
                                image={marker.image}
                                key={marker.key}
                                title={marker.title}
                                coordinate={marker.coord}
                                pinColor={marker.pinColor} >
                                </Marker>
                        );
                    })} */}
                </MapView>
            </View>
        )
    }
}

export default Principal;