import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { modificaEmail } from '../actions/AutenticacaoAction';

const styles = StyleSheet.create({
    fundo: {
        backgroundColor: '#09709a',
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    segundoFundo: {
        backgroundColor: '#F2F2F2',
        width: 400,
        borderWidth: 1,
        borderColor: '#000',
        elevation: 10,
        marginVertical: 10

    },
    txtCampo: {
        borderWidth: 1,
        borderColor: "#000",
        marginVertical: 10,
        paddingLeft: 20,
        fontSize: 15,
        color: '#000',
        marginHorizontal: 10
    },
    bttEsqueceuSenha: {
        backgroundColor: '#017fc1',
        padding: 10,
        marginHorizontal: 108,
        alignItems: "center",
        elevation: 10,
        marginVertical: 20
    },
    bttGoogle: {
        width: 192,
        alignSelf: 'center',
        padding: 15,
    },
    txtBttEsqueceuSenha: {
        color: "#F2F2F2",
        fontWeight: 'bold',
        fontSize: 15
    },
    txtTitulo: {
        color: '#000',
        fontSize: 23,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginHorizontal: 20,
        marginVertical: 20
    }
})


class EsqueceuSenha extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.fundo}>
                <View style={styles.segundoFundo}>
                    <Text style={styles.txtTitulo}>Informe seu e-mail para que seja gerada uma nova senha</Text>

                    <TextInput
                        placeholder="E-mail"
                        value={this.props.email}
                        onChangeText={(texto) => this.props.modificaEmail(texto)}
                        style={styles.txtCampo}
                    />

                    <TouchableOpacity
                        onPress={() => this.enviaEmail(this.enviaEmail)}>
                        <View style={styles.bttEsqueceuSenha}>
                            <Text style={styles.txtBttEsqueceuSenha}>Enviar</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    email: state.AutenticacaoReducer.email
})

export default connect(mapStateToProps, { modificaEmail })(EsqueceuSenha);