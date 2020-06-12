import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
import _ from 'lodash';

import {
    EMAIL_USUARIO_ADICIONAR,
    LISTA_CONTATOS,
    ENVIAR_PEDIDO_CONTATO_EMAIL,
    PEDIDO_ENVIADO_SUCESSO,
    PEDIDO_ENVIADO_ERRO,
    LISTA_PEDIDO_USUARIO,
    LISTA_CONTATO_USUARIO,
    MODIFICA_MENSAGEM,
    ENVIAR_MENSAGEM,
    LISTA_CONVERSA_USUARIO,
    LISTA_CONVERSAS_USUARIO
} from './type'

export const modificaEmailUsuario = (email) => {
    return {
        type: EMAIL_USUARIO_ADICIONAR,
        payload: email
    }
}

export const contatosFetch = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref('/contatos')
            .on('value', snapshot => {

                var array = []
                for (var teste in snapshot.val()) {
                    let varTemporaria = _.values(snapshot.val()[teste]);
                    let objetoReal = _.first(varTemporaria);
                    if (objetoReal.email !== currentUser.email) {
                        array.push(objetoReal);
                    }
                }

                dispatch({ type: LISTA_CONTATOS, payload: array })
            })

    }
}


export const enviarPedidoContatoEmail = (email) => {
    return dispatch => {
        var emailB64 = b64.encode(email);
        const { currentUser } = firebase.auth();
        var emailSolicitanteb64 = b64.encode(currentUser.email);
        if (currentUser.email === email) {
            pedidoEnviadoErro(dispatch, 'Não é possível adicionar a sí mesmo! desculpe.');
        } else {

            firebase.database().ref('/contatos/' + emailSolicitanteb64)
                .once('value')
                .then(snapshot => {
                    if (snapshot.val()) {
                        const dadosUsuarioSolicitante = _.first(_.values(snapshot.val()));

                        firebase.database().ref('/contatos/' + emailB64)
                            .once('value')
                            .then(snapshot2 => {
                                if (snapshot2.val()) {
                                    dispatch({ type: ENVIAR_PEDIDO_CONTATO_EMAIL });
                                    // first -> extrai a informação do valor quando so tem um elemento;
                                    // values -> tras os valores em um array.
                                    // const dadosUsuario = _.first(_values(snapshot.val()));
                                    var emailPedido = b64.encode(email);
                                    firebase.database().ref("/pedidos/" + emailPedido)
                                        .push({
                                            email: currentUser.email,
                                            nome: dadosUsuarioSolicitante.nome
                                        })
                                        .then(() => {
                                            pedidoEnviadoSucesso(dispatch);

                                        })
                                } else {
                                    pedidoEnviadoErro(dispatch, 'Não existe um usuário com este e-mail!');
                                }
                            });

                    }
                })
        }
    }

}

const pedidoEnviadoSucesso = (dispatch) => {
    dispatch({ type: PEDIDO_ENVIADO_SUCESSO, payload: 'Pedido enviado para o usuário com sucesso!' })
}

const pedidoEnviadoErro = (dispatch, erro) => {
    dispatch({ type: PEDIDO_ENVIADO_ERRO, payload: erro });
}

export const pedidosUsuarioFetch = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {

        var emailUsuarioB64 = b64.encode(currentUser.email);
        firebase.database().ref('/pedidos/' + emailUsuarioB64)
            .on('value', snapshot => {

                var listaPedidos = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid }
                })

                dispatch({ type: LISTA_PEDIDO_USUARIO, payload: listaPedidos })
            })

    }
}

export const aceitarPedido = (item, uid) => {
    const { currentUser } = firebase.auth();

    var emailAceito = b64.encode(item.email);
    var emailResposta = b64.encode(currentUser.email);

    return dispatch => {

        firebase.database().ref('/usuario_contato/' + emailResposta)
            .push({
                email: item.email,
                nome: item.nome
            })
            .then(snapshot => {
                firebase.database().ref('/contatos/' + emailResposta)
                    .once('value')
                    .then(snapshot2 => {

                        const dadosUsuarioSolicitante = _.first(_.values(snapshot2.val()));
                        firebase.database().ref('/usuario_contato/' + emailAceito)
                            .push({
                                email: currentUser.email,
                                nome: dadosUsuarioSolicitante.nome
                            })
                            .then(snapshot => {
                                var pedidos = firebase.database().ref("/pedidos/" + emailResposta);
                                pedidos.child(uid).remove();

                            })

                    })

            })
    }
}

export const recusarPedido = (uid) => {
    return dispatch => {
        var { currentUser } = firebase.auth();
        var emailResposta = b64.encode(currentUser.email);
        var pedidos = firebase.database().ref("/pedidos/" + emailResposta);
        pedidos.child(uid).remove();

    }
}

export const contatoUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        var emailUsuarioB64 = b64.encode(currentUser.email);
        firebase.database().ref('/usuario_contato/' + emailUsuarioB64)
            .on('value', snapshot => {

                var listaContatoUsuario = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid }
                })

                dispatch({ type: LISTA_CONTATO_USUARIO, payload: listaContatoUsuario })
            })
    }
}

export const modificaMensagem = (texto) => {
    return ({
        type: MODIFICA_MENSAGEM,
        payload: texto
    })
}

export const enviarMensagem = (mensagem, contatoNome, contatoEmail) => {

    //dados do contato (contatoNome e contatoEmail)
    //dados do usuário autenticado (currentUser)
    var { currentUser } = firebase.auth();
    var usuarioEmail = currentUser.email;
    return dispatch => {
        //converter para base 64
        var usuarioEmailB64 = b64.encode(usuarioEmail);
        var contatoEmailB64 = b64.encode(contatoEmail);

        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .push({ mensagem: mensagem, tipo: 'e' })
            .then(() => {
                firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
                    .push({ mensagem: mensagem, tipo: 'r' })
                    .then(() => {
                        dispatch({ type: ENVIAR_MENSAGEM, payload: '' });
                    })
                    .then(() => { //cabeçalho de conversa do usuário autenticado
                        firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                            .set({ nome: contatoNome, email: contatoEmail, mensagem: mensagem })
                            .then(() => { // cabeçalho de conversa do contato
                                dispatch({ type: ENVIAR_MENSAGEM, payload: '' });
                                firebase.database().ref(`/contatos/${usuarioEmailB64}`)
                                    .once('value')
                                    .then((snapshot) => {
                                        var dadosUsuario = _.first(_.values(snapshot.val()));
                                        firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                                            .set({ nome: dadosUsuario.nome, email: usuarioEmail, mensagem: mensagem })
                                            .then(() => {

                                            })

                                    })


                            })
                    })
            })
    }
}

export const conversaUsuarioFetch = (contatoEmail) => {
    const { currentUser } = firebase.auth();
    var emailUsuarioB64 = b64.encode(currentUser.email);
    var emailContatoB64 = b64.encode(contatoEmail);

    return (dispatch) => {

        firebase.database().ref(`/mensagens/${emailUsuarioB64}/${emailContatoB64}`)
            .on('value', snapshot => {

                const conversa = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid }
                })

                dispatch({ type: LISTA_CONVERSA_USUARIO, payload: conversa })
            })

    }
}

export const conversasUsuarioFetch = () => {
    const { currentUser } = firebase.auth();
    var emailUsuarioB64 = b64.encode(currentUser.email);

    return (dispatch) => {

        firebase.database().ref(`/usuario_conversas/${emailUsuarioB64}`)
            .on('value', snapshot => {

                const conversas = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid }
                })

                console.log(conversas);

                dispatch({ type: LISTA_CONVERSAS_USUARIO, payload: conversas })
            })

    }
}

