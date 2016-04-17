import { PropTypes } from 'react';

const Buttons = (props) => {
  return (
    <div>
      <button>Restart level</button>
      <button>Level selection</button>
      <button onClick={() => props.actions.toggleSound()}>
      { props.sound ? 'SOUND OFF' : 'SOUND ON' }
      </button>
      <button>(?)</button>
    </div>
  );
};

Buttons.propTypes = {
  sound: PropTypes.bool.isRequired
};

export default Buttons;
