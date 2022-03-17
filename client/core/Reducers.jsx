
import { combineReducers } from 'redux';
import {
  COIN,
  COINS,
  ERROR,
  TXS,
  POS,
  WATCH_ADD,
  WATCH_REMOVE,
  LOGIN
} from '../constants';

// The initial state of the coin object.
const coinInit = {
  blocks: 0, btc: 0, cap: 0, createdAt: 0,
  diff: 0, mnsOff: 0, mnsOn: 0, netHash: 0,
  peers: 0, status: 'Offline', supply: 0, usd: 0
};
/**
 * Will handle the coin key state.
 * @param {Object} state The current or default state.
 * @param {Object} action The flux compatible action.
 */
const coin = (state = coinInit, action) => {
  if (action.type === COIN && action.payload) {
    return { ...action.payload };
  }
  return state;
};

/**
 * Will handle the coins key state used to build the
 * summary graphs in the header section.
 * @param {Object} state The current or default state.
 * @param {Object} action The flux compatible action.
 */
const coins = (state = [], action) => {
  if (action.type === COINS && action.payload) {
    return [...action.payload];
  }
  return state;
};

/**
 * Will handle the updating of the state.
 * @param {Array} state The current or default list of transactions.
 * @param {Object} action The flux compatible action.
 */
const txs = (state = [], action) => {
  if (action.type === TXS && action.payload) {

    // Lazily Ensure we never have more than 1000 items in store
    if (state.length > 1000) {
      state.splice(0, 1000);
    }

    // Merge state with the new payload
    action.payload.forEach((tx, index) => {
      let matchingTx = state.find(stateTx => stateTx.txId == tx.txId);
      if (matchingTx) {
        Object.assign(matchingTx, tx); // Copy new payload data to exisiting object

        return;
      }
      state.push(tx); // Add new tx to store
    });

    // Ensure the transactions are ordered with most recent blocks first
    state.sort((tx1, tx2) => {
      return tx2.sequence - tx1.sequence;
    });
  }
  return state;
};

/**
 * Will handle the updating of the pos calculator state.
 * @param {Array} state The current or default list of transactions.
 * @param {Object} action The flux compatible action.
 */
const pos = (state = {}, action) => {
  //@todo add pos global state
  return state;
};

const initialUserState = {
  addresses: [

  ]
}
/**
 * Will handle the updating of the login state.
 */
const user = (state = initialUserState, action) => {
  const { type, payload } = action;

  if (type === LOGIN && payload) {

    if (payload && payload.success) {
      // Do not insert same address if one was already verified
      if (state.addresses.some(address => address.address === payload.address)) {
        return state;
      }

      return {
        ...state,
        addresses: [
          ...state.addresses,
          payload
        ]
      }
    }
  }
  return state;
};


// Export and combine our reducers.
export default combineReducers({
  coin,
  coins,
  txs,
  pos,
  user
});
