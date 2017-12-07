import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {getObserverList, getDictionary} from './utils';
class LazyLoad extends Component {
  isLoaded = element => element.getAttribute('data-loaded') === 'true'
  onIntersection = load => (entries, observer) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        observer.unobserve(entry.target)
        if (!this.isLoaded(entry.target)) {
          load(entry.target)
        }
      }
    })
  }
  load = (element) => {
    const rcId = element.getAttribute('data-rcId')
    element.setAttribute('data-loaded', true);
    const dictionary = getDictionary();
    const component = dictionary[rcId];
    setTimeout(() => {
      component.isVisible = true;
      component.forceUpdate();
    }, 1000)
  }

  componentDidMount() {
    const {rootMargin = '0px', threshold = 0, uniqId} = this.props;
    const root = null;
    if (window.IntersectionObserver) {
      let observer
      const observerList = getObserverList();
      let obId;
      const keys = Object.keys(observerList);
      for (let i = 0; i < observerList.length; i++) {
        if (observerList[keys[i]].root === root) {
          obId = keys[i];
        }
      }
      if (!obId) {
        obId = Math.floor(Math.random()* 1000000);
        observer = new IntersectionObserver(this.onIntersection(this.load), {
          rootMargin,
          threshold
        });
        observerList[obId] = {root, observer }
      } else {
        observer = observerList[obId];
      }

      observer.observe(ReactDOM.findDOMNode(this));
      const dictionary = getDictionary();
      dictionary[uniqId] = this;
      const ele = ReactDOM.findDOMNode(this);
      if (ele.getAttribute) {
        ele.setAttribute('data-rcId', uniqId);
      }
    } else {
      console.error('relpace to chrome browser');
    }
  }
  render() {
    return (
      <div>
        {
           this.isVisible ?
             this.props.children :
             <div
               style={{
                 width: 200,
                 height: 200,
                 textAlign: 'center',
                 lineHeight: '200px',
                 border: '1px solid black'
               }}
             >
               loadding
             </div>
        }
      </div>
    );
  }
}
LazyLoad.isVisible = false;
export default LazyLoad;
