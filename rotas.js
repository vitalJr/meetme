import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Loading from './src/loading';
import Mapa from './src/mapa/mapa';
import Chat from './src/chat/chat';
import Login from './src/login/login';
import Cadastro from './src/registro/cadastro';
import EsqueceuSenha from './src/registro/esqueceusenha';
import Pedidos from './src/notificacao/pedidos';
import Conversa from './src/chat/conversa';
import Locais from './src/locais/locais';

class Rotas extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router navigationBarStyle={{ backGroundColor: '#F2F2F2' }} titleStyle={{ color: '#5458af' }}>
                <Scene key="root">
                    <Scene key='loading' component={Loading} hideNavBar={true} />
                    <Scene key='login' component={Login} hideNavBar={true} initial />
                    <Scene key='cadastro' component={Cadastro} hideNavBar={false} />
                    <Scene key='esqueceusenha' component={EsqueceuSenha} hideNavBar={false} />
                    <Scene key='mapa' component={Mapa} hideNavBar={true} />
                    <Scene key='chat' component={Chat} hideNavBar={true} />
                    <Scene key="pedidos" component={Pedidos} hideNavBar={true} />
                    <Scene key="conversa" component={Conversa} hideNavBar={false} />
                    <Scene key="locais" component={Locais} hideNavBar={true} />
                </Scene>
            </Router>
        )
    }

}

export default Rotas;