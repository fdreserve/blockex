
import Component from '../../core/Component';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import config from '../../../config'

import numeral from 'numeral';
import Card from './Card';
import CountUp from '../CountUp';

export default class CardStatus extends Component {
  static defaultProps = {
    avgBlockTime: 60,
    avgMNTime: 8,
    blocks: 0,
    peers: 0,
    countCarverAddresses: 0,
    countCarverMovements: 0,
    status: 'Offline',
    coin: { uniqueMasternodeAddresses24h: 0, uniquePosAddresses24h: 0, posRoi24h: 0, mnRoi24h: 0 }
  };

  static propTypes = {
    avgBlockTime: PropTypes.number.isRequired,
    avgMNTime: PropTypes.number.isRequired,
    blocks: PropTypes.number.isRequired,
    peers: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    countCarverAddresses: PropTypes.number.isRequired,
    countCarverMovements: PropTypes.number.isRequired,
    coin: PropTypes.object.isRequired,
  };

  render() {
    const isOn = this.props.status === 'Online';


    return (
      <div className="animated fadeInUp">
        <Card className="card--status" >
          <div className="card__row justify-content-between mt-3">
            <span className="card__label">Status:</span>
            <span className="card__result card__result--status">
              <span className={`u--text-${isOn ? 'green' : 'red'}`}>
                {this.props.status}
              </span>
            </span>
          </div>
          <div className="card__row justify-content-between">
            <span className="card__label">Blocks:</span>
            <span className="card__result">
              <Link to={`/block/${this.props.blocks}`}>
                <b>
                  <CountUp
                    decimals={0}
                    duration={1}
                    end={this.props.blocks}
                    start={0} />
                </b>
              </Link>
            </span>
          </div>
          <div className="card__row justify-content-between">
            <span className="card__label">Avg. Block Time:</span>
            <span className="card__result">{(this.props.avgBlockTime || 0).toFixed(2)} Sec</span>
          </div>
          <div className="card__row justify-content-between">
            <span className="card__label">Avg. MN Payment:</span>
            <span className="card__result">{(this.props.avgMNTime || 0).toFixed(2)} hours</span>
          </div>
          <div className="card__row justify-content-between">
            <span className="card__label">Unique Addresses:</span>
            <span className="card__result">
              {numeral(this.props.countCarverAddresses).format('0,0')}</span>
          </div>
          <div className="card__row justify-content-between">
            <span className="card__label">Non-Reward Transactions:</span>
            <span className="card__result">{numeral(this.props.countCarverMovements).format('0,0')}</span>
          </div>
		    <div className="card__row justify-content-between">
            <span className="card__label">NFT Masternodes:</span>
            <span className="card__result">
            <b>
             <CountUp
                    decimals={0}
                    duration={1}
                    end={config.nftNodes.Rnodes + config.nftNodes.Cnodes + config.nftNodes.Snodes}
                    start={0} />
                </b></span>
          </div>
        </Card>
      </div>
    );
  };
}
