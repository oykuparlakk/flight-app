import React from 'react';
import { RingLoader } from 'react-spinners';

const Loader = ({ loading }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${loading ? 'visible' : 'invisible'}`}>
      <RingLoader color={"#123abc"} loading={loading} />
    </div>
  );
};

export default Loader;
