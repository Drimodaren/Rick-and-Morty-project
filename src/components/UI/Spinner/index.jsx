import React from 'react';
import style from './Spinner.module.scss'

export default function Spinner() {
  console.log('spinner');
  return (
    <div className= {style.spinnerWrapper}>
      <div className= {style.lds_roller}>
        
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
