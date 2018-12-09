import axios from 'axios'
export const titleAction = 'TITLEAction'
export const demoaDataAction = 'DEMOADATAACTION'
export const indexDataAction = 'INDEXDATAACTION'
export const demobDataAction = 'DEMOBDATAACTION'

// 修改title
export const updateTitle = () => {
    return async (dispatch) => {
        const response = await axios.post('http://localhost:8000/api-title')
        if(response.data && response.data.success) {
            dispatch({ type: titleAction, title: response.data.title })
        }
    }   
}

export const updateAData = () => {
    return async (dispatch) => {
        const response = await axios.post('http://localhost:8000/api-demoa')
        if(response.data && response.data.success) {
            dispatch({ type: demoaDataAction, data: response.data.data })
        }
    }
}

export const updateBData = () => {
    return async (dispatch) => {
        const response = await axios.post('http://localhost:8000/api-demob')
        if(response.data && response.data.success) {
            dispatch({ type: demobDataAction, data: response.data.data })
        }
    }
}

export const updateIData = () => {
    return async (dispatch) => {
        const response = await axios.post('http://localhost:8000/api-index')
        if(response.data && response.data.success) {
            dispatch({ type: indexDataAction, data: response.data.data })
        }
    }
}