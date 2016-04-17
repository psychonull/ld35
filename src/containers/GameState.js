// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HUD from '../components/HUD.js';
import * as GameStateActions from '../actions/gameStateActions.js';

class App extends React.Component {
  render() {
    const { gameState, actions } = this.props;

    return (
        <HUD gameState={gameState} actions={actions} />
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  gameState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    gameState: state.gameState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GameStateActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
