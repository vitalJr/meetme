import { LISTA_LOCAIS_VISITADOS } from '../actions/type'

const INITIAL_STATE = {
    locaisVisitados: []
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LISTA_LOCAIS_VISITADOS:
            return { ...state, locaisVisitados: action.payload }
    }
    return state;
}