import * as Constants from "../constants/action-types.js";

const initialState = {
    list: [],
    selectedFund: null,
    selectedItem: null,
    itemDate: '', 
    itemAmount: '', 
    itemQuantity: '', 
    itemTax: '',
    fundName: '',
    fundId: ''
};

function rootReducer(state = initialState, action) {
    let fundName = '';
    let fundId = '';
    if (action.type === Constants.SET_SELECTED_FUND) {
        if (action.payload) {
            fundName = action.payload.fundName;
            fundId = action.payload.fundId;
        }
        else {
            fundName = '';
            fundId = '';
        }
        return Object.assign({}, state, {
            selectedFund: action.payload,
            fundName: fundName,
            fundId: fundId
        });
    }
    else if (action.type === Constants.SET_LIST) {return Object.assign({}, state, {list: action.payload});}
    else if (action.type === Constants.SET_SELECTED_ITEM) {
        return Object.assign({}, state, {
            selectedItem: action.payload,
            itemDate: action.payload.date, 
            itemAmount: action.payload.cost, 
            itemQuantity: action.payload.quantity, 
            itemTax: action.payload.tax
        });
    }
    else if (action.type === Constants.SET_FUND_NAME) {return Object.assign({}, state, {fundName: action.payload});}
    else if (action.type === Constants.SET_FUND_ID) {return Object.assign({}, state, {fundId: action.payload});}
    else if (action.type === Constants.SET_ITEM_DATE) {return Object.assign({}, state, {itemDate: action.payload});}
    else if (action.type === Constants.SET_ITEM_AMOUNT) {return Object.assign({}, state, {itemAmount: action.payload});}
    else if (action.type === Constants.SET_ITEM_QUANTITY) {return Object.assign({}, state, {itemQuantity: action.payload});}
    else if (action.type === Constants.SET_ITEM_TAX) {return Object.assign({}, state, {itemTax: action.payload});}
    else {return state;}
};

export default rootReducer;