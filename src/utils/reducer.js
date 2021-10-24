

export const reducer = (state, action)=>{
    switch (action.type) {
        case "login":
            return {
                ...state,
                logged:!state.logged
            }
        default:
            return state
    }
}
export const initialState = {
    logged:false
}