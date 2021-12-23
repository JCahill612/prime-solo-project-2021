const toyBoxReducer = (state = [], action) => {
    // console.log('-------> in toyBoxReducer');
    if (action.type === 'GET_toybox') {
        return action.payload;
    }
    return state;
};//end toyBoxReducer

export default toyBoxReducer;