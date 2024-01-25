import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import useScrollToEnd from '../hooks/useScrollToEnd';
import useSticky from '../hooks/useSticky';

const AutoHideFollowButton = ({ children, className }) => {
  const [sticky] = useSticky();
  const scrollToEnd = useScrollToEnd();

  return (
    !sticky && (
      <button className={classNames("react-scroll-to-bottom__AutoHideFollowButton", className)} onClick={scrollToEnd} type="button">
        {children}
      </button>
    )
  );
};

AutoHideFollowButton.defaultProps = {
  children: undefined,
  className: ''
};

AutoHideFollowButton.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export default AutoHideFollowButton;
