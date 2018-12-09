import { combineReducers } from 'redux'

import { titleAction, demoaDataAction, indexDataAction, demobDataAction } from './actions'

function appReducres(state ={ title: 'DEMO'}, action) {
    switch(action.type) {
        case titleAction:
            return {...state, title: action.title}
        default:
            return state
    }
}

function demoaReducres(state = { data: ['demoa啦啦啦','demoa哈哈哈','demoa呀呀呀'] }, action) {
    switch(action.type) {
        case demoaDataAction:
            return {...state, data: action.data}
        default:
            return state
    }
}

function demobReducres(state = { data: ['bbbb啦啦啦','bbbb哈哈哈','bbbb呀呀呀'] }, action) {
    switch(action.type) {
        case demobDataAction:
            return {...state, data: action.data}
        default:
            return state
    }
}

function indexReducres(state = { data: ['index啦啦啦','index哈哈哈','index呀呀呀'] }, action) {
    switch(action.type) {
        case indexDataAction:
            return {...state, data: action.data}
        default:
            return state
    }
}

export default combineReducers({
    app: appReducres,
    a: demoaReducres,
    b: demobReducres,
    i: indexReducres
})