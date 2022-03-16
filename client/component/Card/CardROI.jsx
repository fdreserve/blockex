
import blockchain from '../../../lib/blockchain';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';
import config from '../../../config'

import Card from './Card';

const CardROI = ({ coin, supply }) => {
  const mncoins = blockchain.mncoins;
  const mns = coin.mnsOff + coin.mnsOn;
  const sns = coin.snOn;
  const cns = coin.cnOn;
  const rns = coin.rnOn;
  const snsubsidy = blockchain.getSnSubsidy(coin.blocks);
  const cnsubsidy = blockchain.getCnSubsidy(coin.blocks);
  const rnsubsidy = blockchain.getRnSubsidy(coin.blocks);
  const snroi = blockchain.getSnROI(snsubsidy, sns);
  const cnroi = blockchain.getCnROI(cnsubsidy, cns);
  const rnroi = blockchain.getRnROI(rnsubsidy, rns);
  const totalsupplynft = ((config.nftNodes.Rnodes * config.coinDetails.reservenodeCollateral) + (config.nftNodes.Cnodes * config.coinDetails.cashnodeCollateral) + (config.nftNodes.Snodes * config.coinDetails.securenodeCollateral));

  
  return (
    <Card title="Coin Info">
      <div className="mb-3">
        <div className="h5">
          {coin.mnsOn} Total Masternodes<br/>
          {coin.snOn} Secure Nodes<br/>
          {coin.cnOn} Cash Nodes<br/>
          {coin.rnOn} Reserve Nodes
        </div>
      </div>
      <div className="mb-3">
        <div className="h5">
         NFT Masternodes :
        </div>
        <div className="h5">
          {config.nftNodes.Rnodes} Reserve Nodes<br/>
          {config.nftNodes.Cnodes} Cash Nodes<br/>
          {config.nftNodes.Snodes} Secure Nodes
        </div>
      </div>
      <div className="mb-3">
        <div className="h5">
         Total Supply :
        </div>
        <div className="h5">
          {numeral(supply ? supply.t : 0.0).format('0,0.0')} {config.coinDetails.shortName}
        </div>
      </div>  
      <div className="mb-3">
        <div className="h5">
        Lock in NFT Mn
        </div>
        <div className="h5">
          {numeral(((config.nftNodes.Rnodes * config.coinDetails.reservenodeCollateral) + (config.nftNodes.Cnodes * config.coinDetails.cashnodeCollateral) + (config.nftNodes.Snodes * mncoins))).format('0,0.0') } {config.coinDetails.shortName}<br/>
          {numeral(((config.nftNodes.Rnodes * config.coinDetails.reservenodeCollateral) + (config.nftNodes.Cnodes * config.coinDetails.cashnodeCollateral) + (config.nftNodes.Snodes * mncoins)) * 100 / supply.t).format('0,0.0') } % of Total Supply
        </div>
      </div>
      <div className="mb-3">
        <div className="h5">
          Market Cap USD :
        </div>
        <div className="h5">
          {numeral(supply.t * coin.usd).format('0,0.00')} USD
        </div>
      </div>
      <div className="mb-3">
        <div className="h5">
          Market Cap BTC
        </div>
        <div className="h5">
          {numeral(supply.t * coin.btc).format('0,0.0000')} BTC
        </div>
      </div>
      <div className="mb-3">
        <div className="h5">
          Secure Node Worth :
        </div>
        <div className="h5">
        {numeral(mncoins * coin.usd).format('0,0.00')} USD
        </div>
        <div className="h6">
          Estimated ROI
        </div>
        <div className="h5">
          {numeral(snroi).format('0,0.0000')}%
        </div>
        <div className="h5">
          Cash Node Worth :
        </div>
        <div className="h5">
        {numeral(config.coinDetails.cashnodeCollateral * coin.usd).format('0,0.00')} USD
        </div>
        <div className="h6">
          Estimated ROI
        </div>
        <div className="h5">
          {numeral(cnroi).format('0,0.0000')}%
        </div>
        <div className="h5">
          Reserve Node Worth :
        </div>
        <div className="h5">
        {numeral(config.coinDetails.reservenodeCollateral * coin.usd).format('0,0.00')} USD
        </div>
        <div className="h6">
          Estimated ROI
        </div>
        <div className="h5">
          {numeral(rnroi).format('0,0.0000')}%
        </div>
      </div>
    </Card>
  );
};

CardROI.propTypes = {
  coin: PropTypes.object.isRequired,
  supply: PropTypes.object.isRequired
};

export default CardROI;
