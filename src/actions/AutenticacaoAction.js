import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';

import {
    MODIFICA_NOME,
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    MODIFICA_CONFIRMACAO_SENHA,
    CADASTRO_EM_ANDAMENTO,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    AUTENTICACAO_USUARIO_SUCESSO,
    AUTENTICACAO_USUARIO_ERRO
} from './type';

export const modificaEmail = (email) => {
    return {
        type: MODIFICA_EMAIL,
        payload: email
    }
}

export const modificaSenha = (senha) => {
    return {
        type: MODIFICA_SENHA,
        payload: senha
    }
}

export const modificaNome = (nome) => {
    return {
        type: MODIFICA_NOME,
        payload: nome
    }
}

export const modificaConfirmacaoSenha = (confirmacaoSenha) => {
    return {
        type: MODIFICA_CONFIRMACAO_SENHA,
        payload: confirmacaoSenha
    }
}

export const cadastraUsuario = ({ nome, email, senha }) => {
    return dispatch => {

        dispatch({ type: CADASTRO_EM_ANDAMENTO, payload: true })

        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                var emailB64 = b64.encode(email);
                firebase.database().ref(`/contatos/${emailB64}`)
                    .push({
                        nome: nome,
                        email: email
                    })
                    .then(value => cadastroUsuarioSucesso(dispatch))
                    .catch(error => {
                        alert(error.message);
                    })
            })
            .catch(error => {
                cadastroUsuarioErro(error, dispatch)
            })
    }
}

const cadastroUsuarioSucesso = (dispatch) => {
    dispatch({ type: CADASTRO_USUARIO_SUCESSO, payload: 'Usuário Cadastrado com sucesso!' })
}

const cadastroUsuarioErro = (erro, dispatch) => {
    dispatch({ type: CADASTRO_USUARIO_ERRO, payload: erro.message });
}

export const autenticarUsuario = (email, senha) => {
    return dispatch => {

        Actions.loading();
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(user => {
                autenticarUsuarioSucesso(dispatch);
                setTimeout(function () { Actions.mapa(); }, 1000);
            })
            .catch(erro => {
                autenticarUsuarioErro(erro, dispatch);
                // setTimeout(function () { Actions.login(); }, 1000);
            })


    }
}

const autenticarUsuarioSucesso = (dispatch) => {
    dispatch({ type: AUTENTICACAO_USUARIO_SUCESSO, payload: 'Usuario autenticado com sucesso!' });
}

const autenticarUsuarioErro = (erro, dispatch) => {
    dispatch({ type: AUTENTICACAO_USUARIO_ERRO, payload: erro.message })
}