import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    FlatList,
    TouchableHighlight
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, Callout } from 'react-native-maps';
import MapViewDirection from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { connect } from 'react-redux';
import { salvarLocalizacaoVisitadas } from '../actions/LocalizacaoActions';

import Menu from '../menu/menu';

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2'
    },
    mapa: {
        flex: 1,
        width: '100%',
    },
    boxSearch: {
        backgroundColor: "#F2F2F2",
        // borderColor: "#000",
        width: '100%',
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        fontSize: 18,
        alignItems: 'flex-start'
    },
    boxVisitados: {
        backgroundColor: "#F2F2F2",
        height: 150,
        elevation: 5,
        borderWidth: 1,
        borderRadius: 10
    },
    locaisVisitados: {
        padding: 5,
        borderWidth: 1,
        borderColor: "#F2F2F2",
        alignItems: 'center',
        margin: 1,
        borderRadius: 5,
        marginHorizontal: 2
    },
    txtLocaisVisitados: {
        fontWeight: 'bold',
        color: "#F2F2F2",
        padding: 5
    },

})

class Mapa extends Component {

    constructor(props) {
        super(props)

        this.state = {
            region: null,
            destLocation: null,
            markers: [],
            locaisVisitados: []
        }

        if (this.props.latitude && this.props.longitude) {
            this.state.destLocation = {
                latitude: this.props.latitude,
                longitude: this.props.longitude
            }

            this.setState(this.state);
        }
    }

    // rederLocaisVisitador() {
    //     if (this.state.locaisVisitados.length > 0) {
    //         return (
    //             <View style={style.boxVisitados}>
    //                 <Text style={{ fontSize: 20, marginHorizontal: 10, fontWeight: 'bold', marginTop: 5 }}>Locais já visitados:</Text>
    //                 <FlatList
    //                     style={{
    //                         // backgroundColor: "#000",
    //                         backgroundColor: 'rgba(52, 52, 52, 0.8)',
    //                         marginHorizontal: 10,
    //                         marginVertical: 5,
    //                         borderRadius: 10,
    //                         borderWidth: 1,
    //                         elevation: 1,
    //                     }}
    //                     data={this.state.locaisVisitados}
    //                     renderItem={({ item }) =>
    //                         <View style={style.locaisVisitados}>
    //                             <Text style={style.txtLocaisVisitados}>{item.nome}</Text>
    //                         </View>

    //                     }
    //                 />
    //             </View>
    //         );
    //     }
    // }

    componentDidMount() {
        Geolocation.getCurrentPosition(
            (position) => {
                var state = this.state;
                state.region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0016,
                    longitudeDelta: 0.0121
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
        });

        state.destLocation = {
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        }

        this.setState(state);
    }


    render() {
        const { region, markers } = this.state;
        return (

            <View style={{ flex: 1 }}>
                <View style={style.boxSearch}>
                    <GooglePlacesAutocomplete
                        placeholder='Informe a localidade'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        listViewDisplayed={false}
                        returnKeyType={'search'}
                        fetchDetails={true}
                        onPress={(data, details = null) => {

                            this.state.markers = [];
                            this.state.markers.push({
                                key: data.id,
                                coord: {
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng
                                },
                                title: data.description,
                                pinColor: "red"
                            })

                            this.state.destLocation = {
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng
                            }

                            this.state.locaisVisitados.push({
                                nome: data.description,
                                lat: details.geometry.location.lat,
                                lgn: details.geometry.location.lng
                            })

                            this.setState({
                                markers: this.state.markers,
                                destLocation: this.state.destLocation,
                                locaisVisitados: this.state.locaisVisitados
                            });

                            let obj = {
                                descricaoLocal: data.description,
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng
                            }

                            this.props.salvarLocalizacaoVisitadas(obj);

                            console.log(data);
                            console.log(details.geometry.location);
                        }}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyA9zGDiIJ85e-IuBh5DQzkzh4U2xLH7-t4',
                            language: 'pt-BR',
                            types: 'geocode',
                        }}
                        styles={{
                            textInputContainer: {
                                backgroundColor: 'rgba(0,0,0,0)',
                                margin: 10
                                // borderTopWidth: 0,
                                // borderBottomWidth: 0,
                            },
                            textInput: {
                                marginLeft: 0,
                                marginRight: 0,
                                height: 40,
                                color: '#5d5d5d',
                                fontSize: 16,
                                borderWidth: 1
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                            },
                        }}
                    />
                </View>

                <View style={style.container}>




                    <MapView
                        ref={(map) => { this.map = map }}
                        minZoomLevel={10}
                        style={style.mapa}
                        region={region}
                        showsUserLocation
                        loadingEnabled
                    >
                        {this.state.destLocation &&
                            <MapViewDirection
                                origin={this.state.region}
                                destination={this.state.destLocation}
                                apikey="AIzaSyA9zGDiIJ85e-IuBh5DQzkzh4U2xLH7-t4"
                                strokeWidth={5}
                                strokeColor="#017fc1"
                            />

                        }

                        {markers.map((marker) => {
                            return (
                                <Marker
                                    image={marker.image}
                                    key={marker.key}
                                    title={marker.title}
                                    coordinate={marker.coord}
                                    pinColor={marker.pinColor} >
                                </Marker>
                            );
                        })}

                    </MapView>
                </View>

                {/* {this.rederLocaisVisitador()} */}
                <Menu menu="home"></Menu>

            </View>

        )
    }
}


export default connect(null, { salvarLocalizacaoVisitadas })(Mapa);