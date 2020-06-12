import {
    SALVAR_LOCAIS_VISITADOS,
    LISTA_LOCAIS_VISITADOS
} from './type'

import firebase from 'firebase';
import _ from 'lodash';
import b64 from 'base-64';


export const salvarLocalizacaoVisitadas = (obj) => {
    const { currentUser } = firebase.auth();
    return despatch => {

        let emailB64 = b64.encode(currentUser.email);
        let latitude = obj.latitude
        let longitude = obj.longitude
        let nomeLocal = obj.descricaoLocal

        var data = new Date();
        var dia = data.getDate().toString()
        var diaF = (dia.length == 1) ? '0' + dia : dia
        var mes = (data.getMonth() + 1).toString() //+1 pois no getMonth Janeiro começa com zero.
        var mesF = (mes.length == 1) ? '0' + mes : mes
        var anoF = data.getFullYear();
        var dias = new Array(
            'domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'
        );

        console.log(diaF + "/" + mesF + "/" + anoF + " - " + dias[data.getDay()]);
        firebase.database().ref(`/locais_visitados/${emailB64}`)
            .push({
                email: currentUser.email,
                descricaoLocal: nomeLocal,
                data: diaF + "/" + mesF + "/" + anoF + " - " + dias[data.getDay()],
                latitude: latitude,
                longitude: longitude
            })
            .then((user) => { })
            .catch(error => { })
    }
}

export const locaisVisitadosFetch = () => {
    const { currentUser } = firebase.auth();
    return dispatch => {
        let emailB64 = b64.encode(currentUser.email);
        firebase.database().ref(`/locais_visitados/${emailB64}`)
            .on('value', snapshot => {

                const locaisVisitados = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid }
                })

                console.log(locaisVisitados);
                dispatch({ type: LISTA_LOCAIS_VISITADOS, payload: locaisVisitados });

            })
    }
}