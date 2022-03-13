
import PropTypes from 'prop-types';
import React from 'react';

import Card from './Card';
import Icon from '../Icon';
import blockchain from '../../../lib/blockchain'

const CardBlockCountdown = ({ height, avgBlockTime, blockCountdown }) => {
  const targetHeight = blockCountdown.block;
  const cardTitle = height >= targetHeight ? blockCountdown.afterTitle : blockCountdown.beforeTitle;

  const actualAvgBlockTime = avgBlockTime > 0 ? avgBlockTime : blockchain.avgBlockTime;

  let label = 'minutes';
  let blocksLeft = Math.abs(blockCountdown.block - height);
  let dur = (blocksLeft * actualAvgBlockTime) / 60.0;

  if (blocksLeft <= 1) {
    label = 'seconds';
    dur = blocksLeft * actualAvgBlockTime;
  }
  // Convert to hours.
  else if (dur > 60) {
    label = 'hours';
    dur = (dur / 60.0).toFixed(2);
  }

  // If more than 48 hours convert to days
  if (dur > 48) {
    label = 'days';
    dur = (dur / 24.0).toFixed(0);
  }

  if (blockCountdown.block - height < 0) {
    label = `${label} ago`;
  }

  const getSuperblockIcon = () => {
    if (blockCountdown.block - height > 0) {
      return null;
    }

    return (<Icon name="check-circle" className="far watch-list__item-close" />);
  }

  return (
    <div className="watch-list">
      <p className="watch-list__title">{cardTitle}</p>
      <div className="animated fadeIn">
        <div className="watch-list__item back-green">
          <div>
            {getSuperblockIcon()}
          </div>
          <div className="watch-list__item-text">
            <h4
              className="text-center text-white"
              style={{
                fontSize: '22px',
                height: '22px',
                lineHeight: '20px'
              }}>
              {dur} {label}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

CardBlockCountdown.propTypes = {
  blockCountdown: PropTypes.object.isRequired
};

export default CardBlockCountdown;
