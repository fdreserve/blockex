
import Component from '../../core/Component';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';
import CarverAddressLabelWidget from '../AddressWidgets/CarverAddressLabelWidget'

import Table from '../Table';
import config from '../../../config'

//@todo this is wrong name for this card, it should be CardVins
export default class CardTXIn extends Component {
  static defaultProps = {
    txs: [] //@todo should be vins
  };

  static propTypes = {
    txs: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      cols: [
        { key: 'address', title: 'Address' },
        { key: 'value', title: 'Amount' }
      ]
    };

    // If any inputs have a related vout add some extra columns. 
    // Ex: Coinbase transactions would not have relatedVout so we don't need to show a bunch of empty data
    /*if (this.props.txs.some(tx => tx.relatedVout)) {
      this.state.cols = [
        { key: 'address', title: 'Address' },
        { key: 'age', title: 'Age' },
        { key: 'confirmations', title: 'Confirmations' },
        { key: 'value', title: 'Value' }
      ]
    }*/
  };

  render() {
    return (
      <Table
        cols={this.state.cols}
        data={this.props.txs.map(tx => ({
          ...tx,
          address: (<Link to={`/address/${tx.carverAddress.label}`}><CarverAddressLabelWidget carverAddress={tx.carverAddress} /></Link>),
          //age: tx.relatedVout
          //  ? (<Link to={`/address/${tx.relatedVout.address}`}>{(tx.relatedVout.age / 60 / 60).toFixed(2)}h</Link>)
          //  : '',
          //confirmations: tx.relatedVout
          //  ? (<Link to={`/address/${tx.relatedVout.address}`}>{tx.relatedVout.confirmations}</Link>)
          //  : '',
          value:
            (
              <span className="badge badge-danger" title={`${numeral(tx.amount).format(config.coinDetails.coinTooltipNumberFormat)} ${config.coinDetails.shortName}`}>
                - {numeral(tx.amount * -1).format(config.coinDetails.coinNumberFormat)} {config.coinDetails.shortName}
              </span>
            ) // @todo Move these badges to a component
        }))} />
    );
  };
}
