import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoRedecer';
import ChatReducer from './ChatReducers';
import LocalizacaoReducer from './LocalizacaoReducer';


export default combineReducers({
    AutenticacaoReducer: AutenticacaoReducer,
    ChatReducer: ChatReducer,
    LocalizacaoReducer: LocalizacaoReducer
})