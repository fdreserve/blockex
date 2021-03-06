
import Component from '../../core/Component';
import PropTypes from 'prop-types';
import React from 'react';
import config from '../../../config'

import Card from './Card';
import CountUp from '../CountUp';
import GraphLine from '../Graph/GraphLine';


export default class CardMasternodeSummary extends Component {
  static defaultProps = {
    offline: 0,
    online: 0,
    snonline: 0,
    cnonline: 0,
    rnonline: 0,
    xAxis: [],
    yAxis: []
  };

  static propTypes = {
    offline: PropTypes.number.isRequired,
    online: PropTypes.number.isRequired,
    snonline: PropTypes.number.isRequired,
    cnonline: PropTypes.number.isRequired,
    rnonline: PropTypes.number.isRequired,
    xAxis: PropTypes.arrayOf(PropTypes.string).isRequired,
    yAxis: PropTypes.arrayOf(PropTypes.number).isRequired
  };

  render() {
    const total = this.props.online + this.props.offline;

    return (
      <div className="animated fadeInUp">
        <Card
          className="card--graph"
          title="Masternodes">
          <p className="card__data-main">
            <CountUp
              decimals={0}
              duration={1}
              end={total}
              start={0} />
          </p>
          <p className="card__data-sub">Snodes: {this.props.snonline} - Cnodes: {this.props.cnonline} - Rnodes: {this.props.rnonline}</p>
          <GraphLine
            color="#1991eb"
            className="card__graph"
            data={this.props.yAxis.reverse()}
            height="100px"
            labels={this.props.xAxis.reverse()} />
        </Card>
      </div>
    );
  };
}
