import Constants from '../constants';

export function setSelectedFund(payload) {return {type: Constants.SET_SELECTED_FUND, payload}};
export function setSelectedItem(payload) {return {type: Constants.SET_SELECTED_ITEM, payload}};
export function setList(payload) {return {type: Constants.SET_LIST, payload}};
export function setFundName(payload) {return {type: Constants.SET_FUND_NAME, payload}};
export function setFundId(payload) {return {type: Constants.SET_FUND_ID, payload}};
export function setItemDate(payload) {return {type: Constants.SET_ITEM_DATE, payload}};
export function setItemAmount(payload) {return {type: Constants.SET_ITEM_AMOUNT, payload}};
export function setItemQuantity(payload) {return {type: Constants.SET_ITEM_QUANTITY, payload}};
export function setItemTax(payload) {return {type: Constants.SET_ITEM_TAX, payload}};