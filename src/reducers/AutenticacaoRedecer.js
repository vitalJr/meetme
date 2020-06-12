import {
    MODIFICA_EMAIL,
    MODIFICA_NOME,
    MODIFICA_SENHA,
    MODIFICA_CONFIRMACAO_SENHA,
    CADASTRO_EM_ANDAMENTO,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    AUTENTICACAO_USUARIO_SUCESSO,
    AUTENTICACAO_USUARIO_ERRO
} from '../actions/type';

const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    confirmacaoSenha: '',
    cadastroEmAndamento: false,
    cadastroUsuarioSucesso: '',
    cadastroUsuarioErro: '',
    autenticacaoUsuarioSucesso: '',
    autenticacaoUsuarioErro: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MODIFICA_EMAIL:
            return { ...state, email: action.payload }
        case MODIFICA_SENHA:
            return { ...state, senha: action.payload }
        case MODIFICA_NOME:
            return { ...state, nome: action.payload }
        case MODIFICA_CONFIRMACAO_SENHA:
            return { ...state, confirmacaoSenha: action.payload }
        case CADASTRO_EM_ANDAMENTO:
            return { ...state, cadastroEmAndamento: action.payload }
        case CADASTRO_USUARIO_SUCESSO:
            return { ...state, cadastroEmAndamento: false, cadastroUsuarioSucesso: action.payload, cadastroUsuarioErro: '' }
        case CADASTRO_USUARIO_ERRO:
            return { ...state, cadastroEmAndamento: false, cadastroUsuarioErro: action.payload, cadastroUsuarioSucesso: '' }
        case AUTENTICACAO_USUARIO_SUCESSO:
            return { ...state, autenticacaoUsuarioSucesso: action.payload, autenticacaoUsuarioErro: '' }
        case AUTENTICACAO_USUARIO_ERRO:
            return { ...state, autenticacaoUsuarioErro: action.payload, autenticacaoUsuarioSucesso: '' }
    }
    return state;
}