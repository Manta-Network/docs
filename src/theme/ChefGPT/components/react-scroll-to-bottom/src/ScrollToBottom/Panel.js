import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import InternalContext from './InternalContext';

const Panel = ({ children, className }) => {
  const { setTarget } = useContext(InternalContext);

  return (
    <div className={classNames("react-scroll-to-bottom__panel", className)} ref={setTarget}>
      {children}
    </div>
  );
};

Panel.defaultProps = {
  children: undefined,
  className: undefined
};

Panel.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export default Panel;
