
const params = {
  LAST_POW_BLOCK: 200, // 345600
  RAMP_TO_BLOCK: 35001,
  LAST_SEESAW_BLOCK: 210
};

const avgBlockTime = 60; // 1 minutes (60 seconds)

const blocksPerDay = (24 * 60 * 60) / avgBlockTime; // 1440

const blocksPerWeek = blocksPerDay * 7; // 10 080

const blocksPerMonth = (blocksPerDay * 365.25) / 12; // 43 830

const blocksPerYear = blocksPerDay * 365.25; // 525 690

const mncoins = 1000;

const cncoins = 10000;

const rncoins = 50000;

const maxSupply = 24000000.0;

const getMNBlocksPerDay = (mns) => {
  return blocksPerDay / mns;
};

const getMNBlocksPerWeek = (mns) => {
  return getMNBlocksPerDay(mns) * (365.25 / 52);
};

const getMNBlocksPerMonth = (mns) => {
  return getMNBlocksPerDay(mns) * (365.25 / 12);
};

const getMNBlocksPerYear = (mns) => {
  return getMNBlocksPerDay(mns) * 365.25;
};

const getSNBlocksPerDay = (sns) => {
  return blocksPerDay / sns;
};

const getSNBlocksPerWeek = (sns) => {
  return getSNBlocksPerDay(sns) * (365.25 / 52);
};

const getSNBlocksPerMonth = (sns) => {
  return getSNBlocksPerDay(sns) * (365.25 / 12);
};

const getSNBlocksPerYear = (sns) => {
  return getSNBlocksPerDay(sns) * 365.25;
};

const getCNBlocksPerDay = (cns) => {
  return blocksPerDay / cns;
};

const getCNBlocksPerWeek = (cns) => {
  return getCNBlocksPerDay(cns) * (365.25 / 52);
};

const getCNBlocksPerMonth = (cns) => {
  return getCNBlocksPerDay(cns) * (365.25 / 12);
};

const getCNBlocksPerYear = (cns) => {
  return getCNBlocksPerDay(cns) * 365.25;
};

const getRNBlocksPerDay = (rns) => {
  return blocksPerDay / rns;
};

const getRNBlocksPerWeek = (rns) => {
  return getRNBlocksPerDay(rns) * (365.25 / 52);
};

const getRNBlocksPerMonth = (rns) => {
  return getRNBlocksPerDay(rns) * (365.25 / 12);
};

const getRNBlocksPerYear = (rns) => {
  return getRNBlocksPerDay(rns) * 365.25;
};

const getMNSubsidy = (nHeight = 0, nMasternodeCount = 0, nMoneySupply = 0) => {
  const blockValue = getSubsidy(nHeight);
  let ret = 0.0;

  if (nHeight > params.LAST_SEESAW_BLOCK) {
    return blockValue / 100 * 65;
  }

  if (nHeight < params.RAMP_TO_BLOCK) {
    ret = 0;
  } else if (nHeight <= 86400 && nHeight >= params.RAMP_TO_BLOCK) {
    ret = blockValue / 5;
  } else if (nHeight <= 57599 && nHeight >= 28800) {
    ret = blockValue / 4;
  } else if (nHeight <= 86399 && nHeight >= 57600) {
    ret = blockValue / 3;
  } else if (nHeight <= params.LAST_POW_BLOCK && nHeight >= 86400) {
    ret = blockValue / 2;
  } else if (nHeight > params.LAST_POW_BLOCK) {
    let mNodeCoins = nMasternodeCount * 1000;
    if (mNodeCoins === 0) {
      ret = 0;
    } else {
      if (mNodeCoins <= (nMoneySupply * 0.01) && mNodeCoins > 0) {
        ret = blockValue * 0.90;
      } else if (mNodeCoins <= (nMoneySupply * 0.02) && mNodeCoins > (nMoneySupply * 0.01)) {
        ret = blockValue * 0.88;
      } else if (mNodeCoins <= (nMoneySupply * 0.03) && mNodeCoins > (nMoneySupply * 0.02)) {
        ret = blockValue * 0.87;
      } else if (mNodeCoins <= (nMoneySupply * 0.04) && mNodeCoins > (nMoneySupply * 0.03)) {
        ret = blockValue * 0.86;
      } else if (mNodeCoins <= (nMoneySupply * 0.05) && mNodeCoins > (nMoneySupply * 0.04)) {
        ret = blockValue * 0.85;
      } else if (mNodeCoins <= (nMoneySupply * 0.06) && mNodeCoins > (nMoneySupply * 0.05)) {
        ret = blockValue * 0.84;
      } else if (mNodeCoins <= (nMoneySupply * 0.07) && mNodeCoins > (nMoneySupply * 0.06)) {
        ret = blockValue * 0.83;
      } else if (mNodeCoins <= (nMoneySupply * 0.08) && mNodeCoins > (nMoneySupply * 0.07)) {
        ret = blockValue * 0.82;
      } else if (mNodeCoins <= (nMoneySupply * 0.09) && mNodeCoins > (nMoneySupply * 0.08)) {
        ret = blockValue * 0.81;
      } else if (mNodeCoins <= (nMoneySupply * 0.10) && mNodeCoins > (nMoneySupply * 0.09)) {
        ret = blockValue * 0.80;
      } else if (mNodeCoins <= (nMoneySupply * 0.11) && mNodeCoins > (nMoneySupply * 0.10)) {
        ret = blockValue * 0.79;
      } else if (mNodeCoins <= (nMoneySupply * 0.12) && mNodeCoins > (nMoneySupply * 0.11)) {
        ret = blockValue * 0.78;
      } else if (mNodeCoins <= (nMoneySupply * 0.13) && mNodeCoins > (nMoneySupply * 0.12)) {
        ret = blockValue * 0.77;
      } else if (mNodeCoins <= (nMoneySupply * 0.14) && mNodeCoins > (nMoneySupply * 0.13)) {
        ret = blockValue * 0.76;
      } else if (mNodeCoins <= (nMoneySupply * 0.15) && mNodeCoins > (nMoneySupply * 0.14)) {
        ret = blockValue * 0.75;
      } else if (mNodeCoins <= (nMoneySupply * 0.16) && mNodeCoins > (nMoneySupply * 0.15)) {
        ret = blockValue * 0.74;
      } else if (mNodeCoins <= (nMoneySupply * 0.17) && mNodeCoins > (nMoneySupply * 0.16)) {
        ret = blockValue * 0.73;
      } else if (mNodeCoins <= (nMoneySupply * 0.18) && mNodeCoins > (nMoneySupply * 0.17)) {
        ret = blockValue * 0.72;
      } else if (mNodeCoins <= (nMoneySupply * 0.19) && mNodeCoins > (nMoneySupply * 0.18)) {
        ret = blockValue * 0.71;
      } else if (mNodeCoins <= (nMoneySupply * 0.20) && mNodeCoins > (nMoneySupply * 0.19)) {
        ret = blockValue * 0.70;
      } else if (mNodeCoins <= (nMoneySupply * 0.21) && mNodeCoins > (nMoneySupply * 0.20)) {
        ret = blockValue * 0.69;
      } else if (mNodeCoins <= (nMoneySupply * 0.22) && mNodeCoins > (nMoneySupply * 0.21)) {
        ret = blockValue * 0.68;
      } else if (mNodeCoins <= (nMoneySupply * 0.23) && mNodeCoins > (nMoneySupply * 0.22)) {
        ret = blockValue * 0.67;
      } else if (mNodeCoins <= (nMoneySupply * 0.24) && mNodeCoins > (nMoneySupply * 0.23)) {
        ret = blockValue * 0.66;
      } else if (mNodeCoins <= (nMoneySupply * 0.25) && mNodeCoins > (nMoneySupply * 0.24)) {
        ret = blockValue * 0.65;
      } else if (mNodeCoins <= (nMoneySupply * 0.26) && mNodeCoins > (nMoneySupply * 0.25)) {
        ret = blockValue * 0.64;
      } else if (mNodeCoins <= (nMoneySupply * 0.27) && mNodeCoins > (nMoneySupply * 0.26)) {
        ret = blockValue * 0.63;
      } else if (mNodeCoins <= (nMoneySupply * 0.28) && mNodeCoins > (nMoneySupply * 0.27)) {
        ret = blockValue * 0.62;
      } else if (mNodeCoins <= (nMoneySupply * 0.29) && mNodeCoins > (nMoneySupply * 0.28)) {
        ret = blockValue * 0.61;
      } else if (mNodeCoins <= (nMoneySupply * 0.30) && mNodeCoins > (nMoneySupply * 0.29)) {
        ret = blockValue * 0.60;
      } else if (mNodeCoins <= (nMoneySupply * 0.31) && mNodeCoins > (nMoneySupply * 0.30)) {
        ret = blockValue * 0.59;
      } else if (mNodeCoins <= (nMoneySupply * 0.32) && mNodeCoins > (nMoneySupply * 0.31)) {
        ret = blockValue * 0.58;
      } else if (mNodeCoins <= (nMoneySupply * 0.33) && mNodeCoins > (nMoneySupply * 0.32)) {
        ret = blockValue * 0.57;
      } else if (mNodeCoins <= (nMoneySupply * 0.34) && mNodeCoins > (nMoneySupply * 0.33)) {
        ret = blockValue * 0.56;
      } else if (mNodeCoins <= (nMoneySupply * 0.35) && mNodeCoins > (nMoneySupply * 0.34)) {
        ret = blockValue * 0.55;
      } else if (mNodeCoins <= (nMoneySupply * 0.363) && mNodeCoins > (nMoneySupply * 0.35)) {
        ret = blockValue * 0.54;
      } else if (mNodeCoins <= (nMoneySupply * 0.376) && mNodeCoins > (nMoneySupply * 0.363)) {
        ret = blockValue * 0.53;
      } else if (mNodeCoins <= (nMoneySupply * 0.389) && mNodeCoins > (nMoneySupply * 0.376)) {
        ret = blockValue * 0.52;
      } else if (mNodeCoins <= (nMoneySupply * 0.402) && mNodeCoins > (nMoneySupply * 0.389)) {
        ret = blockValue * 0.51;
      } else if (mNodeCoins <= (nMoneySupply * 0.415) && mNodeCoins > (nMoneySupply * 0.402)) {
        ret = blockValue * 0.50;
      } else if (mNodeCoins <= (nMoneySupply * 0.428) && mNodeCoins > (nMoneySupply * 0.415)) {
        ret = blockValue * 0.49;
      } else if (mNodeCoins <= (nMoneySupply * 0.441) && mNodeCoins > (nMoneySupply * 0.428)) {
        ret = blockValue * 0.48;
      } else if (mNodeCoins <= (nMoneySupply * 0.454) && mNodeCoins > (nMoneySupply * 0.441)) {
        ret = blockValue * 0.47;
      } else if (mNodeCoins <= (nMoneySupply * 0.467) && mNodeCoins > (nMoneySupply * 0.454)) {
        ret = blockValue * 0.46;
      } else if (mNodeCoins <= (nMoneySupply * 0.48) && mNodeCoins > (nMoneySupply * 0.467)) {
        ret = blockValue * 0.45;
      } else if (mNodeCoins <= (nMoneySupply * 0.493) && mNodeCoins > (nMoneySupply * 0.48)) {
        ret = blockValue * 0.44;
      } else if (mNodeCoins <= (nMoneySupply * 0.506) && mNodeCoins > (nMoneySupply * 0.493)) {
        ret = blockValue * 0.43;
      } else if (mNodeCoins <= (nMoneySupply * 0.519) && mNodeCoins > (nMoneySupply * 0.506)) {
        ret = blockValue * 0.42;
      } else if (mNodeCoins <= (nMoneySupply * 0.532) && mNodeCoins > (nMoneySupply * 0.519)) {
        ret = blockValue * 0.41;
      } else if (mNodeCoins <= (nMoneySupply * 0.545) && mNodeCoins > (nMoneySupply * 0.532)) {
        ret = blockValue * 0.40;
      } else if (mNodeCoins <= (nMoneySupply * 0.558) && mNodeCoins > (nMoneySupply * 0.545)) {
        ret = blockValue * 0.39;
      } else if (mNodeCoins <= (nMoneySupply * 0.571) && mNodeCoins > (nMoneySupply * 0.558)) {
        ret = blockValue * 0.38;
      } else if (mNodeCoins <= (nMoneySupply * 0.584) && mNodeCoins > (nMoneySupply * 0.571)) {
        ret = blockValue * 0.37;
      } else if (mNodeCoins <= (nMoneySupply * 0.597) && mNodeCoins > (nMoneySupply * 0.584)) {
        ret = blockValue * 0.36;
      } else if (mNodeCoins <= (nMoneySupply * 0.61) && mNodeCoins > (nMoneySupply * 0.597)) {
        ret = blockValue * 0.35;
      } else if (mNodeCoins <= (nMoneySupply * 0.623) && mNodeCoins > (nMoneySupply * 0.61)) {
        ret = blockValue * 0.34;
      } else if (mNodeCoins <= (nMoneySupply * 0.636) && mNodeCoins > (nMoneySupply * 0.623)) {
        ret = blockValue * 0.33;
      } else if (mNodeCoins <= (nMoneySupply * 0.649) && mNodeCoins > (nMoneySupply * 0.636)) {
        ret = blockValue * 0.32;
      } else if (mNodeCoins <= (nMoneySupply * 0.662) && mNodeCoins > (nMoneySupply * 0.649)) {
        ret = blockValue * 0.31;
      } else if (mNodeCoins <= (nMoneySupply * 0.675) && mNodeCoins > (nMoneySupply * 0.662)) {
        ret = blockValue * 0.30;
      } else if (mNodeCoins <= (nMoneySupply * 0.688) && mNodeCoins > (nMoneySupply * 0.675)) {
        ret = blockValue * 0.29;
      } else if (mNodeCoins <= (nMoneySupply * 0.701) && mNodeCoins > (nMoneySupply * 0.688)) {
        ret = blockValue * 0.28;
      } else if (mNodeCoins <= (nMoneySupply * 0.714) && mNodeCoins > (nMoneySupply * 0.701)) {
        ret = blockValue * 0.27;
      } else if (mNodeCoins <= (nMoneySupply * 0.727) && mNodeCoins > (nMoneySupply * 0.714)) {
        ret = blockValue * 0.26;
      } else if (mNodeCoins <= (nMoneySupply * 0.74) && mNodeCoins > (nMoneySupply * 0.727)) {
        ret = blockValue * 0.25;
      } else if (mNodeCoins <= (nMoneySupply * 0.753) && mNodeCoins > (nMoneySupply * 0.74)) {
        ret = blockValue * 0.24;
      } else if (mNodeCoins <= (nMoneySupply * 0.766) && mNodeCoins > (nMoneySupply * 0.753)) {
        ret = blockValue * 0.23;
      } else if (mNodeCoins <= (nMoneySupply * 0.779) && mNodeCoins > (nMoneySupply * 0.766)) {
        ret = blockValue * 0.22;
      } else if (mNodeCoins <= (nMoneySupply * 0.792) && mNodeCoins > (nMoneySupply * 0.779)) {
        ret = blockValue * 0.21;
      } else if (mNodeCoins <= (nMoneySupply * 0.805) && mNodeCoins > (nMoneySupply * 0.792)) {
        ret = blockValue * 0.20;
      } else if (mNodeCoins <= (nMoneySupply * 0.818) && mNodeCoins > (nMoneySupply * 0.805)) {
        ret = blockValue * 0.19;
      } else if (mNodeCoins <= (nMoneySupply * 0.831) && mNodeCoins > (nMoneySupply * 0.818)) {
        ret = blockValue * 0.18;
      } else if (mNodeCoins <= (nMoneySupply * 0.844) && mNodeCoins > (nMoneySupply * 0.831)) {
        ret = blockValue * 0.17;
      } else if (mNodeCoins <= (nMoneySupply * 0.857) && mNodeCoins > (nMoneySupply * 0.844)) {
        ret = blockValue * 0.16;
      } else if (mNodeCoins <= (nMoneySupply * 0.87) && mNodeCoins > (nMoneySupply * 0.857)) {
        ret = blockValue * 0.15;
      } else if (mNodeCoins <= (nMoneySupply * 0.883) && mNodeCoins > (nMoneySupply * 0.87)) {
        ret = blockValue * 0.14;
      } else if (mNodeCoins <= (nMoneySupply * 0.896) && mNodeCoins > (nMoneySupply * 0.883)) {
        ret = blockValue * 0.13;
      } else if (mNodeCoins <= (nMoneySupply * 0.909) && mNodeCoins > (nMoneySupply * 0.896)) {
        ret = blockValue * 0.12;
      } else if (mNodeCoins <= (nMoneySupply * 0.922) && mNodeCoins > (nMoneySupply * 0.909)) {
        ret = blockValue * 0.11;
      } else if (mNodeCoins <= (nMoneySupply * 0.935) && mNodeCoins > (nMoneySupply * 0.922)) {
        ret = blockValue * 0.10;
      } else if (mNodeCoins <= (nMoneySupply * 0.945) && mNodeCoins > (nMoneySupply * 0.935)) {
        ret = blockValue * 0.09;
      } else if (mNodeCoins <= (nMoneySupply * 0.961) && mNodeCoins > (nMoneySupply * 0.945)) {
        ret = blockValue * 0.08;
      } else if (mNodeCoins <= (nMoneySupply * 0.974) && mNodeCoins > (nMoneySupply * 0.961)) {
        ret = blockValue * 0.07;
      } else if (mNodeCoins <= (nMoneySupply * 0.987) && mNodeCoins > (nMoneySupply * 0.974)) {
        ret = blockValue * 0.06;
      } else if (mNodeCoins <= (nMoneySupply * 0.99) && mNodeCoins > (nMoneySupply * 0.987)) {
        ret = blockValue * 0.05;
      } else {
        ret = blockValue * 0.01;
      }
    }
  }

  return ret;
};

const getSubsidy = (nHeight = 1) => {
  let nSubsidy = 0.0;
  let nSlowSubsidy = 50.0;

  if (nHeight === 1) {
    nSubsidy = 3000000;
  } else if (nHeight < params.RAMP_TO_BLOCK / 2) {
    nSlowSubsidy /= params.RAMP_TO_BLOCK;
    nSlowSubsidy *= nHeight;
  } else if (nHeight < params.RAMP_TO_BLOCK) {
    nSlowSubsidy /= params.RAMP_TO_BLOCK;
    nSlowSubsidy *= nHeight;
  } else if (nHeight <= 86400 && nHeight >= params.RAMP_TO_BLOCK) {
    nSubsidy = 0.228;
  } else if (nHeight <= 216000 && nHeight >= 86401) {
    nSubsidy = 0.304;
  } else if (nHeight <= 388800 && nHeight >= 216001) {
    nSubsidy = 0.380;
  } else if (nHeight <= 518400 && nHeight >= 388801) {
    nSubsidy = 0.456;
  } else if (nHeight <= 691200 && nHeight > 518401) {
    nSubsidy = 0.380;
  } else if (nHeight <= 1036800 && nHeight >= 691201) {
    nSubsidy = 0.304;
  } else if (nHeight <= 3664800 && nHeight >= 1036801) {
    nSubsidy = 0.228;
  } else if (nHeight <= 5241600 && nHeight >= 3664801) {
    nSubsidy = 0.152;
  } else if (nHeight <= 8301003 && nHeight >= 5241600) {
    nSubsidy = 0.076;
  } else {
    nSubsidy = 0;

  }

  return nHeight >= params.RAMP_TO_BLOCK ? nSubsidy : nSlowSubsidy;
};

const getSnSubsidy = (nHeight = 0) => {
  let nSubsidy = 0.0;
  let nSlowSubsidy = 50.0;

  if (nHeight === 1) {
    nSubsidy = 3000000;
  } else if (nHeight < params.RAMP_TO_BLOCK / 2) {
    nSlowSubsidy /= params.RAMP_TO_BLOCK;
    nSlowSubsidy *= nHeight;
  } else if (nHeight < params.RAMP_TO_BLOCK) {
    nSlowSubsidy /= params.RAMP_TO_BLOCK;
    nSlowSubsidy *= nHeight;
  } else if (nHeight <= 86400 && nHeight >= params.RAMP_TO_BLOCK) {
    nSubsidy = 0.228;
  } else if (nHeight <= 216000 && nHeight >= 86401) {
    nSubsidy = 0.304;
  } else if (nHeight <= 388800 && nHeight >= 216001) {
    nSubsidy = 0.380;
  } else if (nHeight <= 518400 && nHeight >= 388801) {
    nSubsidy = 0.456;
  } else if (nHeight <= 691200 && nHeight > 518401) {
    nSubsidy = 0.380;
  } else if (nHeight <= 1036800 && nHeight >= 691201) {
    nSubsidy = 0.304;
  } else if (nHeight <= 3664800 && nHeight >= 1036801) {
    nSubsidy = 0.228;
  } else if (nHeight <= 5241600 && nHeight >= 3664801) {
    nSubsidy = 0.152;
  } else if (nHeight <= 8301003 && nHeight >= 5241600) {
    nSubsidy = 0.076;
  } else {
    nSubsidy = 0;
  }

  return nHeight >= params.RAMP_TO_BLOCK ? nSubsidy : nSlowSubsidy;
};

const getCnSubsidy = (nHeight = 0) => {
  let nSubsidy = 0.0;
  let nSlowSubsidy = 50.0;

  if (nHeight === 1) {
    nSubsidy = 3000000;
  } else if (nHeight < params.RAMP_TO_BLOCK / 2) {
    nSlowSubsidy /= params.RAMP_TO_BLOCK;
    nSlowSubsidy *= nHeight;
  } else if (nHeight < params.RAMP_TO_BLOCK) {
    nSlowSubsidy /= params.RAMP_TO_BLOCK;
    nSlowSubsidy *= nHeight;
  } else if (nHeight <= 86400 && nHeight >= params.RAMP_TO_BLOCK) {
    nSubsidy = 0.570;
  } else if (nHeight <= 216000 && nHeight >= 86401) {
    nSubsidy = 0.760;
  } else if (nHeight <= 388800 && nHeight >= 216001) {
    nSubsidy = 0.950;
  } else if (nHeight <= 518400 && nHeight >= 388801) {
    nSubsidy = 1.140;
  } else if (nHeight <= 691200 && nHeight > 518401) {
    nSubsidy = 0.950;
  } else if (nHeight <= 1036800 && nHeight >= 691201) {
    nSubsidy = 0.760;
  } else if (nHeight <= 3664800 && nHeight >= 1036801) {
    nSubsidy = 0.570;
  } else if (nHeight <= 5241600 && nHeight >= 3664801) {
    nSubsidy = 0.380;
  } else if (nHeight <= 8301003 && nHeight >= 5241600) {
    nSubsidy = 0.190;
  } else {
    nSubsidy = 0;
  }

  return nHeight >= params.RAMP_TO_BLOCK ? nSubsidy : nSlowSubsidy;
};

const getRnSubsidy = (nHeight = 0) => {
  let nSubsidy = 0.0;
  let nSlowSubsidy = 50.0;

  if (nHeight === 1) {
    nSubsidy = 3000000;
  } else if (nHeight < params.RAMP_TO_BLOCK / 2) {
    nSlowSubsidy /= params.RAMP_TO_BLOCK;
    nSlowSubsidy *= nHeight;
  } else if (nHeight < params.RAMP_TO_BLOCK) {
    nSlowSubsidy /= params.RAMP_TO_BLOCK;
    nSlowSubsidy *= nHeight;
  } else if (nHeight <= 86400 && nHeight >= params.RAMP_TO_BLOCK) {
    nSubsidy = 1.425;
  } else if (nHeight <= 216000 && nHeight >= 86401) {
    nSubsidy = 1.900; 
  } else if (nHeight <= 388800 && nHeight >= 216001) {
    nSubsidy = 2.375;
  } else if (nHeight <= 518400 && nHeight >= 388801) {
    nSubsidy = 2.850;
  } else if (nHeight <= 691200 && nHeight > 518401) {
    nSubsidy = 2.375;
  } else if (nHeight <= 1036800 && nHeight >= 691201) {
    nSubsidy = 1.900;
  } else if (nHeight <= 3664800 && nHeight >= 1036801) {
    nSubsidy = 1.425;
  } else if (nHeight <= 5241600 && nHeight >= 3664801) {
    nSubsidy = 0.950;
  } else if (nHeight <= 8301003 && nHeight >= 5241600) {
    nSubsidy = 0.475;
  } else {
    nSubsidy = 0;
  }

  return nHeight >= params.RAMP_TO_BLOCK ? nSubsidy : nSlowSubsidy;
};

const getBlockSubsidy = (nHeight = 0) => {
  let nSubsidy = 0.0;
  let nSlowSubsidy = 50.0;

  if (nHeight === 1) {
    nSubsidy = 3000000;
  } else if (nHeight < params.RAMP_TO_BLOCK / 2) {
    nSlowSubsidy /= params.RAMP_TO_BLOCK;
    nSlowSubsidy *= nHeight;
  } else if (nHeight < params.RAMP_TO_BLOCK) {
    nSlowSubsidy /= params.RAMP_TO_BLOCK;
    nSlowSubsidy *= nHeight;
  } else if (nHeight <= 86400 && nHeight >= params.RAMP_TO_BLOCK) {
    nSubsidy = 3;
  } else if (nHeight <= 216000 && nHeight >= 86401) {
    nSubsidy = 4; 
  } else if (nHeight <= 388800 && nHeight >= 216001) {
    nSubsidy = 5;
  } else if (nHeight <= 518400 && nHeight >= 388801) {
    nSubsidy = 6;
  } else if (nHeight <= 691200 && nHeight > 518401) {
    nSubsidy = 5;
  } else if (nHeight <= 1036800 && nHeight >= 691201) {
    nSubsidy = 4;
  } else if (nHeight <= 3664800 && nHeight >= 1036801) {
    nSubsidy = 3;
  } else if (nHeight <= 5241600 && nHeight >= 3664801) {
    nSubsidy = 2;
  } else if (nHeight <= 8301003 && nHeight >= 5241600) {
    nSubsidy = 1;
  } else {
    nSubsidy = 0;
  }

  return nHeight >= params.RAMP_TO_BLOCK ? nSubsidy : nSlowSubsidy;
};

const getROI = (subsidy, mns) => {
  return ((getMNBlocksPerYear(mns) * subsidy) / mncoins) * 100.0;
};

const getSnROI = (snsubsidy, sns) => {
  return ((getSNBlocksPerYear(sns) * snsubsidy) / mncoins) * 100.0;
};

const getCnROI = (cnsubsidy, cns) => {
  return ((getCNBlocksPerYear(cns) * cnsubsidy) / cncoins) * 100.0;
};

const getRnROI = (rnsubsidy, rns) => {
  return ((getRNBlocksPerYear(rns) * rnsubsidy) / rncoins) * 100.0;
};

const isAddress = (s) => {
  return typeof (s) === 'string' && s.length === 34;
};

const isBlock = (s) => {
  return !isNaN(s) || (typeof (s) === 'string');
};

const isPoS = (b) => {
  return !!b && b.height > params.LAST_POW_BLOCK; // > 200
};

const isTX = (s) => {
  return typeof (s) === 'string' && s.length === 64;
};

/**
 * How we identify if a raw transaction is Proof Of Stake & Masternode reward
 * @param {String} rpctx The transaction hash string.
 */
const isRewardRawTransaction = (rpctx) => {
  return rpctx.vin.length == 1 &&
    rpctx.vout.length == 3 && // @todo it's possible for reward to have >3 outputs. Ex: "159ff849ae833c3abd05a7b36c5ecc7c4a808a8f1ef292dad0b02875009e009e" on Bulwark Coin (governance)
    // First vout is always in this format
    rpctx.vout[0].value == 0.0 &&
    rpctx.vout[0].n == 0 &&
    rpctx.vout[0].scriptPubKey &&
    rpctx.vout[0].scriptPubKey.type == "nonstandard";

}

module.exports = {
  avgBlockTime,
  blocksPerDay,
  blocksPerMonth,
  blocksPerWeek,
  blocksPerYear,
  mncoins,
  cncoins,
  rncoins,
  maxSupply,
  params,
  getMNBlocksPerDay,
  getMNBlocksPerMonth,
  getMNBlocksPerWeek,
  getMNBlocksPerYear,
  getSNBlocksPerDay,
  getSNBlocksPerMonth,
  getSNBlocksPerWeek,
  getSNBlocksPerYear,
  getCNBlocksPerDay,
  getCNBlocksPerMonth,
  getCNBlocksPerWeek,
  getCNBlocksPerYear,
  getRNBlocksPerDay,
  getRNBlocksPerMonth,
  getRNBlocksPerWeek,
  getRNBlocksPerYear,
  getMNSubsidy,
  getSubsidy,
  getSnSubsidy,
  getCnSubsidy,
  getRnSubsidy,
  getBlockSubsidy,
  getROI,
  getSnROI,
  getCnROI,
  getRnROI,
  isAddress,
  isBlock,
  isPoS,
  isTX,
  isRewardRawTransaction
};
