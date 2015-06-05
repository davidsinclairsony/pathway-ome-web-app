/**
 * Adapted from https://github.com/Khan/react-components/blob/master/js/timeout-transition-group.jsx


import {React, Velocity} from '../../libs';

var ReactTransitionGroup = React.addons.TransitionGroup;





var React, ReactTransitionGroup, Style, VelocityTransitionGroup, VelocityTransitionGroupChild, _;

React = require("react");

Style = require('utils/style-constants');

_ = require('lodash');

ReactTransitionGroup = React.addons.TransitionGroup;

VelocityTransitionGroupChild = React.createClass({
  displayName: "VelocityTransitionGroupChild",
  getTransitionProperties: function(transition, type) {
    return this.transitions()[transition][type];
  },
  getDelay: function(transition, type) {
    var ref, ref1;
    return ((ref = this.transitions()[transition]) != null ? (ref1 = ref.delay) != null ? ref1[type] : void 0 : void 0) || 0;
  },
  getEasing: function(transition, type) {
    var ref, ref1;
    return ((ref = this.transitions()[transition]) != null ? (ref1 = ref.easing) != null ? ref1[type] : void 0 : void 0) || Style.transitionEasing;
  },
  transitions: function() {
    return {
      slideLeft: {
        enter: {
          opacity: [1, 0],
          translateX: [0, '100%'],
          height: [0, 0]
        },
        leave: {
          opacity: [0, 1],
          translateX: ['-100%', 0],
          height: [0, 0]
        }
      },
      slideRight: {
        enter: {
          opacity: [1, 0],
          translateX: [0, '-100%'],
          height: [0, 0]
        },
        leave: {
          opacity: [0, 1],
          translateX: ['100%', 0],
          height: [0, 0]
        }
      },
      slideUp: {
        enter: {
          opacity: [1, 0],
          translateY: [0, this._screenHeight()],
          height: [0, 0]
        },
        leave: {
          opacity: [0, 1],
          translateY: ["-" + (this._screenHeight()), 0],
          height: [0, 0]
        }
      },
      flipY: {
        enter: {
          opacity: [1, 0.1],
          rotateY: [0, 90],
          height: [0, 0]
        },
        leave: {
          opacity: [0.1, 1],
          rotateY: [-90, 0],
          height: [0, 0]
        },
        delay: {
          enter: this.props.duration
        },
        easing: {
          enter: 'easeInCubic',
          leave: 'easeOutCubic'
        }
      },
      batman: {
        enter: {
          opacity: [1, 0],
          rotateZ: [0, 720],
          scale: [1, 0],
          height: [this._screenHeight(), this._screenHeight()]
        },
        leave: {
          opacity: [0, 1],
          rotateZ: [-720, 0],
          scale: [0, 1],
          height: [this._screenHeight(), this._screenHeight()]
        },
        delay: {
          enter: this.props.duration
        },
        easing: {
          enter: 'easeInCubic',
          leave: 'easeOutCubic'
        }
      },
      slideDown: {
        enter: {
          opacity: [1, 0],
          translateY: [0, "-" + (this._screenHeight())],
          height: [0, 0]
        },
        leave: {
          opacity: [0, 1],
          translateY: [this._screenHeight(), 0],
          height: [0, 0]
        }
      },
      fade: {
        enter: {
          opacity: [1, 0],
          height: [0, 0]
        },
        leave: {
          opacity: [0, 1],
          height: [0, 0]
        }
      }
    };
  },
  _screenHeight: function() {
    return (typeof window !== "undefined" && window !== null ? window.innerHeight : void 0) || '100px';
  },
  transition: function(animationType, finishCallback) {
    var node, transitionProperties;
    this.transitioning = true;
    node = this.getDOMNode();
    transitionProperties = this.getTransitionProperties(this.props.transition, animationType);
    $.Velocity({
      elements: node
    }, transitionProperties, {
      duration: this.props.duration,
      easing: this.getEasing(this.props.transition, animationType),
      delay: this.getDelay(this.props.transition, animationType),
      complete: (function(_this) {
        return function() {
          _this.transitioning = false;
          return typeof finishCallback === "function" ? finishCallback() : void 0;
        };
      })(this)
    });
  },
  componentDidMount: function() {
    return _.delay((function(_this) {
      return function() {
        if (!_this.transitioning) {
          return _this.setState({
            style: {}
          });
        } else {

        }
      };
    })(this));
  },
  componentWillUnmount: function() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  },
  componentWillEnter: function(done) {
    if (this.props.enter) {
      this.transition("enter", done);
    } else {
      done();
    }
  },
  componentWillLeave: function(done) {
    if (this.props.leave) {
      this.transition("leave", done);
    } else {
      done();
    }
  },
  getInitialState: function() {
    return {
      style: {
        opacity: 0,
        height: 0
      }
    };
  },
  render: function() {
    return React.DOM.div({
      style: this.state.style
    }, React.Children.only(this.props.children));
  }
});

VelocityTransitionGroup = React.createClass({
  displayName: "VelocityTransitionGroup",
  propTypes: {
    duration: React.PropTypes.number,
    transitionEnter: React.PropTypes.bool,
    transitionLeave: React.PropTypes.bool,
    transition: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object])
  },
  getDefaultProps: function() {
    return {
      transition: 'fade',
      duration: Style.transitionSpeed * 2,
      transitionEnter: true,
      transitionLeave: true
    };
  },
  _wrapChild: function(child) {
    return VelocityTransitionGroupChild({
      transition: this.props.transition,
      duration: this.props.duration,
      enter: this.props.transitionEnter,
      leave: this.props.transitionLeave
    }, child);
  },
  render: function() {
    return this.transferPropsTo(ReactTransitionGroup({
      childFactory: this._wrapChild,
      className: 'transition-group'
    }, this.props.children));
  }
});

module.exports = VelocityTransitionGroup;

// ---
// generated by coffee-script 1.9.2
*/