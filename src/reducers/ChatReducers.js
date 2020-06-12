import {
    EMAIL_USUARIO_ADICIONAR,
    LISTA_CONTATOS,
    PEDIDO_ENVIADO_SUCESSO,
    PEDIDO_ENVIADO_ERRO,
    PEDIDO_ENVIADO_ERRO_MESMO_USUARIO,
    LISTA_PEDIDO_USUARIO,
    LISTA_CONTATO_USUARIO,
    ENVIAR_MENSAGEM,
    LISTA_CONVERSA_USUARIO,
    LISTA_CONVERSAS_USUARIO,
    MODIFICA_MENSAGEM
} from '../actions/type'

const INITIAL_STATE = {
    emailUsuarioAdicionar: '',
    listaContatos: [],
    listaPedidosUsuario: [],
    listaContatoUsuario: [],
    conversa: [],
    conversas:[],
    msgPedidoEnviadoSucesso: '',
    msgPedidoEnviadoErro: '',
    mensagem: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_USUARIO_ADICIONAR:
            return { ...state, emailUsuarioAdicionar: action.payload }
        case LISTA_CONTATOS:
            return { ...state, listaContatos: action.payload }
        case PEDIDO_ENVIADO_SUCESSO:
            return { ...state, msgPedidoEnviadoSucesso: action.payload, msgPedidoEnviadoErro: '' }
        case PEDIDO_ENVIADO_ERRO:
            return { ...state, msgPedidoEnviadoErro: action.payload, msgPedidoEnviadoSucesso: '' }
        case PEDIDO_ENVIADO_ERRO_MESMO_USUARIO:
            return { ...state, msgPedidoEnviadoErro: action.payload, msgPedidoEnviadoSucesso: '' }
        case LISTA_PEDIDO_USUARIO:
            return { ...state, listaPedidosUsuario: action.payload }
        case LISTA_CONTATO_USUARIO:
            return { ...state, listaContatoUsuario: action.payload }
        case MODIFICA_MENSAGEM:
            return { ...state, mensagem: action.payload }
        case ENVIAR_MENSAGEM:
            return { ...state, mensagem: '' }
        case LISTA_CONVERSA_USUARIO:
            return { ...state, conversa: action.payload };
        case LISTA_CONVERSAS_USUARIO:
            return { ...state, conversas: action.payload };
    }
    return state;
}