import defaultState from "./state";
const reducer = (state=defaultState,action)=>{
    let {type,payload}=action;
    switch(type){
        case 'SHOW_LOADING':
            return Object.assign({},state,{
                bLoading:true
            });
            break;
        case 'HIDE_LOADING':
            return Object.assign({},state,{
                bLoading:false
            })
            break;
        case 'SHOW_NAV':
            return Object.assign({},state,{
                bNav:true
            })
            break;
        case 'HIDE_NAV':
            return Object.assign({},state,{
                bNav:false
            })
            break;
        case 'CHANGE_NUM':
            return Object.assign({},state,{
                num:payload
            })
            break;
        case 'ADD':
            return Object.assign({},state,{
                num:state.num+=payload
            })
            break;
        default:
            return state;
    }
}

export default reducer;