import React, {Component} from 'react';
import PropTypes from 'prop-types';

export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    };
    constructor () {
      super();
      this.state = { allProps: {} };
    }

    componentWillMount () {
      const { store } = this.context;
      this._updateProps();
      store.subscribe(() => {this._updateProps();console.log(this);});
    }

    _updateProps () {
      const { store } = this.context;
      let stateProps = mapStateToProps
        ? mapStateToProps(store.getState(), this.props)
        : {};
      let dispatchProps = mapDispatchToProps
        ? mapDispatchToProps(store.dispatch, this.props)
        : {};
      this.setState({
        allProps: { // 整合普通的 props 和从 state 生成的 props
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      });
    }
    render() {
      return (<WrappedComponent {...this.state.allProps}/>);
    }
  }
  return Connect;
}