import React, { Fragment } from 'react';
import spinner from '../assets/spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '200px', margin: '210px auto', display: 'block' }}
      alt="Loading..."
    />
  </Fragment>
);

export default Spinner;