import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export default function NoContent({ icon, message, className }) {
  return (
    <div className={classnames('row content-empty', className)}>
      {icon && <i className={`icon-3x icon-${icon}`}></i>}
      <h4>{message}</h4>
    </div>
  );
}

NoContent.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  message: PropTypes.string.isRequired,
};
