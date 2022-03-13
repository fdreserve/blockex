
import fetchWorker from '../../lib/fetch.worker';
import promise from 'bluebird';
import {
  COIN,
  COINS,
  ERROR,
  TXS,
  WATCH_ADD,
  WATCH_REMOVE,
  POS,
  LOGIN
} from '../constants';

const promises = [];
const worker = new fetchWorker();

/**
 * A message sent to worker will have a unique identifier
 */
let messageId = 0;

worker.onerror = (err) => {
  console.log(err);
  return err;
};

worker.onmessage = (ev) => {
  const promiseIndex = promises.findIndex(promise => promise.messageId === ev.data.id);
  if (promiseIndex === -1) {
    return false;
  }

  if (ev.data.error) {
    promises[promiseIndex].reject(ev.data.error);
    promises.splice(promiseIndex, 1);
    return false;
  }

  promises[promiseIndex].resolve(ev.data.data);
  promises.splice(promiseIndex, 1);
  return true;
};

const getFromWorker = (type, resolve, reject, query = null) => {
  messageId++; // For each message to worker, increment the message id (that way we can identify what promise is resolved from worker by the id instead of by type)

  promises.push({ resolve, reject, type, messageId });
  worker.postMessage({ query, type, id: messageId });
  return true;
};

export const getAddress = (query) => {
  return new promise((resolve, reject) => {
    return getFromWorker('address', resolve, reject, query);
  });
};

export const login = (dispatch, query) => {
  return new promise((resolve, reject) => {
    return getFromWorker(
      'login',
      (payload) => {
        if (dispatch) {
          dispatch({ payload, type: LOGIN });
        }
        resolve(payload);
      },
      (payload) => {
        const errorPayload = JSON.parse(payload);
        if (dispatch) {
          dispatch({ payload: errorPayload, type: LOGIN });
        }
        reject(errorPayload);
      },
      query
    );
  });
};

export const getBlock = (query) => {
  return new promise((resolve, reject) => {
    return getFromWorker('block', resolve, reject, query);
  });
};

export const getCoinHistory = (dispatch, query) => {
  return new promise((resolve, reject) => {
    return getFromWorker(
      'coins',
      (payload) => {
        if (payload && payload.length) {
          dispatch({ payload: payload[0], type: COIN });
        }
        dispatch({ payload, type: COINS });
        resolve(payload);
      },
      (payload) => {
        dispatch({ payload, type: ERROR });
        reject(payload);
      },
      query
    );
  });
};

export const getCoinsWeek = () => {
  return new promise((resolve, reject) => {
    return getFromWorker('coins-week', resolve, reject);
  });
};

export const getIsBlock = (query) => {
  return new promise((resolve, reject) => {
    return getFromWorker('is-block', resolve, reject, query);
  });
};

export const getMNs = (query) => {
  return new promise((resolve, reject) => {
    return getFromWorker('mns', resolve, reject, query); // Resolves to getMNs in fetch.worker.js
  });
};

export const getPeers = () => {
  return new promise((resolve, reject) => {
    return getFromWorker(
      'peers',
      (peers) => {
        resolve(peers.map((peer) => {
          const parts = peer.ip.split('.');
          parts[3] = 'XXX';
          peer.ip = parts.join('.');
          return peer;
        }));
      },
      reject
    );
  });
};

export const getSupply = (dispatch) => {
  return new promise((resolve, reject) => {
    return getFromWorker('supply', resolve, reject);
  });
};

export const getTop100 = () => {
  return new promise((resolve, reject) => {
    return getFromWorker('top-100', resolve, reject);
  });
};

export const getTX = (query) => {
  return new promise((resolve, reject) => {
    return getFromWorker('tx', resolve, reject, query);
  });
};

export const getTXLatest = (dispatch, query) => {
  return new promise((resolve, reject) => {
    return getFromWorker(
      'txs-latest',
      (payload) => {
        if (dispatch) {
          dispatch({ payload, type: TXS });
        }
        resolve(payload);
      },
      (payload) => {
        if (dispatch) {
          dispatch({ payload, type: ERROR });
        }
        reject(payload);
      },
      query
    );
  });
};

export const getTXs = (dispatch, query) => {
  return new promise((resolve, reject) => {
    return getFromWorker(
      'txs',
      (payload) => {
        if (dispatch) {
          dispatch({ payload, type: TXS });
        }
        resolve(payload);
      },
      (payload) => {
        if (dispatch) {
          dispatch({ payload, type: ERROR });
        }
        reject(payload);
      },
      query
    );
  });
};

export const getPos = (dispatch, query) => {
  return new promise((resolve, reject) => {
    return getFromWorker(
      'pos',
      (payload) => {
        // If dispatch is provided we can store in global store via redux.
        // If there is no dispatch we'll resolve via callback (allowing us to consume it right away without global store)
        if (dispatch) {
          dispatch({ payload, type: POS });
        }

        resolve(payload);
      },
      (payload) => {
        if (dispatch) {
          dispatch({ payload, type: ERROR });
        }
        reject(payload);
      },
      query
    );
  });
};

export const getMovements = (dispatch, query) => {
  return new promise((resolve, reject) => {
    return getFromWorker(
      'movements',
      (payload) => {
        if (dispatch) {
          dispatch({ payload, type: MOVEMENTS });
        }
        resolve(payload);
      },
      (payload) => {
        if (dispatch) {
          dispatch({ payload, type: ERROR });
        }
        reject(payload);
      },
      query
    );
  });
};

export const getTimeIntervals = (query) => {
  return new promise((resolve, reject) => {
    return getFromWorker(
      'timeIntervals',
      (payload) => {
        //@todo global state?
        resolve(payload);
      },
      (payload) => {
        //@todo global state?
        reject(payload);
      },
      query
    );
  });
};
export const getSocial = (query) => {
  return new promise((resolve, reject) => {
    return getFromWorker(
      'social',
      (payload) => {
        //@todo global state?
        resolve(payload);
      },
      (payload) => {
        //@todo global state?
        reject(payload);
      },
      query
    );
  });
};

export const getRewards = (dispatch, query) => {
  return new promise((resolve, reject) => {
    return getFromWorker(
      'rewards',
      (payload) => {
        if (dispatch) {
          dispatch({ payload, type: REWARDS });
        }
        resolve(payload);
      },
      (payload) => {
        if (dispatch) {
          dispatch({ payload, type: ERROR });
        }
        reject(payload);
      },
      query
    );
  });
};


export const getTXsWeek = () => {
  return new promise((resolve, reject) => {
    return getFromWorker('txs-week', resolve, reject);
  });
};

// This is currently the only action that updates anything in the store - Look at Reducers.jsx, txs()
export const setTXs = (dispatch, txs) => {
  dispatch({ payload: txs, type: TXS });
};

//@todo Remove, don't think this is used
export const setWatch = (dispatch, term) => {
  dispatch({ payload: term, type: WATCH_ADD });
};

//@todo Remove, don't think this is used
export const removeWatch = (dispatch, term) => {
  dispatch({ payload: term, type: WATCH_REMOVE });
};

export default {
  getAddress,
  getBlock,
  getCoinHistory,
  getCoinsWeek,
  getIsBlock,
  getMNs,
  getPeers,
  getSupply,
  getTop100,
  getTX,
  getTXLatest,
  getTXs,
  getTXsWeek,
  getPos,
  setTXs,
  setWatch,
  removeWatch,
  getRewards,
  getMovements,
  getTimeIntervals,
  getSocial,
  login
};
