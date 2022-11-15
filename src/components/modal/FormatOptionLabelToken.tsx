import React from 'react';

type PropsType = {
  value?: string;
  label?: string;
  customAbbreviation?: any;
};
export default function FormatOptionLabelToken({ value, label, customAbbreviation }: PropsType) {
  let logo;
  switch (value) {
    case 'usd':
      logo = '/assets/images/dollar.svg';
      break;
    case 'eth':
      logo = '/assets/images/eth_icon_02.svg';
      break;
    case 'weth':
      logo = '/assets/images/eth_icon_03.svg';
      break;
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="chain" width="25px" height="25px" style={{ borderRadius: '50%' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
        <div style={{ fontWeight: 'bold' }}>{label}</div>
      </div>
    </div>
  );
}
