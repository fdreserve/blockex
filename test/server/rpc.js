
import chai from 'chai';
import RPC from '../../lib/rpc';

const expect = chai.expect;
const rpc = new RPC();
const should = chai.should();

describe('RPC', () => {
  it('getinfo', (done) => {
    rpc.call('getinfo')
      .then((res) => {
        res.version.should.be.a('number');
        res.protocolversion.should.be.a('number');
        res.walletversion.should.be.a('number');
        res.blocks.should.be.a('number');
        res.difficulty.should.be.a('number');
        done();
      });
  });

  it('getnetworkhashps', (done) => {
    rpc.call('getnetworkhashps')
      .then((res) => {
        res.should.be.a('number');
        done();
      });
  });

  it('getblockhash', (done) => {
    rpc.call('getblockhash', [0])
      .then((res) => {
        res.should.be.a('string');
        res.should.eq('000004cd47fe736ef70d94b35fe7a7dae8338138efe5cda2a2869532a69f17cb');
        done();
      });
  });

  it('getblock', (done) => {
    rpc.call('getblock', ['000004cd47fe736ef70d94b35fe7a7dae8338138efe5cda2a2869532a69f17cb'])
      .then((res) => {
        res.hash.should.be.a('string');
        res.confirmations.should.be.a('number');
        res.version.should.be.a('number');
        res.merkleroot.should.be.a('string');
        res.tx.should.be.a('array');
        res.time.should.be.a('number');
        res.nonce.should.be.a('number');
        res.bits.should.be.a('string');
        res.difficulty.should.be.a('number');
        res.chainwork.should.be.a('string');
        done();
      });
  });

  it('getrawtransaction', (done) => {
    rpc.call('getrawtransaction', ['ed0f190d98fc6f16ce782a13e84c974122f99e554762486d277af2e325b64d72'])
      .then((res) => {
        res.should.be.a('string');
        res.should.eq('01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff03510101ffffffff01001df43228dd0100232102291e55f0fbb4415b5ddf523f73d41879d823b13c5a5d91a2fd6bd8323b95069aac000000001347656e6572617465205072656d696e65205478');
        done();
      });
  });

  it('getpeerinfo', (done) => {
    rpc.call('getpeerinfo')
      .then((res) => {
        res.should.be.a('array');
        done();
      });
  });

  it('getmasternodecount', (done) => {
    rpc.call('getmasternodecount')
      .then((res) => {
        res.should.be.a('object');
        res.total.should.be.a('number');
        res.stable.should.be.a('number');
        res.enabled.should.be.a('number');
        res.ipv4.should.be.a('number');
        res.ipv6.should.be.a('number');
        res.onion.should.be.a('number');
        done();
      });
  });

  it('masternode list', (done) => {
    rpc.call('masternode', ['list'])
      .then((res) => {
        res.should.be.a('array');
        done();
      });
  });
});
