import React from 'react';
import './SkeletonLoader.css';

function SkeletonLoader() {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-header"></div>
      <div className="skeleton-table">
        <div className="skeleton-row">
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
        </div>
      </div>
      <div className="skeleton-subheader"></div>
      <div className="skeleton-table">
        <div className="skeleton-row">
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
        </div>
      </div>
      <div className="skeleton-image"></div>
    </div>
  );
}

export default SkeletonLoader;
