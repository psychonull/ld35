import { PropTypes } from 'react';

const Tips = (props) => {
  return (
    <div>
      { props.tip }
    </div>
  );
};

Tips.propTypes = {
  tip: PropTypes.string
};

export default Tips;
