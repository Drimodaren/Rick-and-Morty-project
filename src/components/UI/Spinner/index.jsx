import React from 'react';
import style from './Spinner.module.css'
import style2 from './spin.module.css'

export function Spinner() {
  console.log('spinner');
  console.log(style);
  return (
    <div className= {style2.spinnerWrapper}>
      <div className= {style2.lds_roller}>
        
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
