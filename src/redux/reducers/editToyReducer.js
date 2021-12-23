const editToyReducer = (state = {}, action)=> {
    //account toy details for that single toy
    if (action.type === 'get_edit_toy') {
        return action.payload[0];
    }
    //changing our title for single toy
    if (action.type === 'change_title'){
        return {...state, post_name: action.payload};
    }
    //changing our category
    if (action.type === 'change_category'){
        return {...state, post_cat: action.payload};
    }
    //changing our description
    if (action.type === 'change_description') {
        return { ...state, post_body: action.payload };
    }
    return state;
};//end editToyReducer

export default editToyReducer;