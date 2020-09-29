import React from 'react';

// Component
import Loader from './Loader';

// Styles
import '../../styles/PageLoading.styl';

function PageLoading() {
  return (
    <div className="PageLoading">
      <Loader />
    </div>
  );
}

export default PageLoading;
