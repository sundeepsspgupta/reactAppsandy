import api from "./api";

export const ACTION_TYPES = {
    SET_CURRENT_MORTGAGETYPE: 'SET_CURRENT_MORTGAGETYPE',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

const formateData = data => ({
    ...data,
    age: parseInt(data.age ? data.age : 0)
})

export const fetchAllMortgageType = () => dispatch => {
    api.mortgageApi().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}



