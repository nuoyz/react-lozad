var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { getObserverList, getDictionary } from './utils';

var LazyLoad = function (_Component) {
  _inherits(LazyLoad, _Component);

  function LazyLoad() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LazyLoad);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LazyLoad.__proto__ || Object.getPrototypeOf(LazyLoad)).call.apply(_ref, [this].concat(args))), _this), _this.isLoaded = function (element) {
      return element.getAttribute('data-loaded') === 'true';
    }, _this.onIntersection = function (load) {
      return function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio > 0) {
            observer.unobserve(entry.target);
            if (!_this.isLoaded(entry.target)) {
              load(entry.target);
            }
          }
        });
      };
    }, _this.load = function (element) {
      var rcId = element.getAttribute('data-rcId');
      element.setAttribute('data-loaded', true);
      var dictionary = getDictionary();
      var component = dictionary[rcId];
      setTimeout(function () {
        component.isVisible = true;
        component.forceUpdate();
      }, 1000);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LazyLoad, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          _props$rootMargin = _props.rootMargin,
          rootMargin = _props$rootMargin === undefined ? '0px' : _props$rootMargin,
          _props$threshold = _props.threshold,
          threshold = _props$threshold === undefined ? 0 : _props$threshold,
          uniqId = _props.uniqId;

      var root = null;
      if (window.IntersectionObserver) {
        var observer = void 0;
        var observerList = getObserverList();
        var obId = void 0;
        var keys = Object.keys(observerList);
        for (var i = 0; i < observerList.length; i++) {
          if (observerList[keys[i]].root === root) {
            obId = keys[i];
          }
        }
        if (!obId) {
          obId = Math.floor(Math.random() * 1000000);
          observer = new IntersectionObserver(this.onIntersection(this.load), {
            rootMargin: rootMargin,
            threshold: threshold
          });
          observerList[obId] = { root: root, observer: observer };
        } else {
          observer = observerList[obId];
        }

        observer.observe(ReactDOM.findDOMNode(this));
        var dictionary = getDictionary();
        dictionary[uniqId] = this;
        var ele = ReactDOM.findDOMNode(this);
        if (ele.getAttribute) {
          ele.setAttribute('data-rcId', uniqId);
        }
      } else {
        console.error('relpace to chrome browser');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.isVisible ? this.props.children : React.createElement(
          'div',
          {
            style: {
              width: 200,
              height: 200,
              textAlign: 'center',
              lineHeight: '200px',
              border: '1px solid black'
            }
          },
          'loadding'
        )
      );
    }
  }]);

  return LazyLoad;
}(Component);

LazyLoad.isVisible = false;
export default LazyLoad;