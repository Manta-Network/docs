import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import AutoHideFollowButton from './ScrollToBottom/AutoHideFollowButton';
import Composer from './ScrollToBottom/Composer';
import Panel from './ScrollToBottom/Panel';

const BasicScrollToBottomCore = ({ children, className, followButtonClassName, scrollViewClassName, style }) => {
  return (
    <div className={classNames("react-scroll-to-bottom__BasicScrollToBottom", className)} style={style}>
      <Panel className={scrollViewClassName}>{children}</Panel>
      <AutoHideFollowButton className={followButtonClassName} />
    </div>
  );
};

BasicScrollToBottomCore.defaultProps = {
  children: undefined,
  className: undefined,
  followButtonClassName: undefined,
  scrollViewClassName: undefined
};

BasicScrollToBottomCore.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  followButtonClassName: PropTypes.string,
  scrollViewClassName: PropTypes.string
};

const BasicScrollToBottom = ({
  checkInterval,
  children,
  className,
  debounce,
  debug,
  followButtonClassName,
  initialScrollBehavior,
  mode,
  nonce,
  scroller,
  scrollViewClassName,
  style,
}) => (
  <Composer
    checkInterval={checkInterval}
    debounce={debounce}
    debug={debug}
    initialScrollBehavior={initialScrollBehavior}
    mode={mode}
    nonce={nonce}
    scroller={scroller}
  >
    <BasicScrollToBottomCore
      className={className}
      style={style}
      followButtonClassName={followButtonClassName}
      scrollViewClassName={scrollViewClassName}
    >
      {children}
    </BasicScrollToBottomCore>
  </Composer>
);

BasicScrollToBottom.defaultProps = {
  checkInterval: undefined,
  children: undefined,
  className: undefined,
  debounce: undefined,
  debug: undefined,
  followButtonClassName: undefined,
  initialScrollBehavior: 'smooth',
  mode: undefined,
  nonce: undefined,
  scroller: undefined,
  scrollViewClassName: undefined
};

BasicScrollToBottom.propTypes = {
  checkInterval: PropTypes.number,
  children: PropTypes.any,
  className: PropTypes.string,
  debounce: PropTypes.number,
  debug: PropTypes.bool,
  followButtonClassName: PropTypes.string,
  initialScrollBehavior: PropTypes.oneOf(['auto', 'smooth']),
  mode: PropTypes.oneOf(['bottom', 'top']),
  nonce: PropTypes.string,
  scroller: PropTypes.func,
  scrollViewClassName: PropTypes.string
};

export default BasicScrollToBottom;
