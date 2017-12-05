import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    const component = window.dictionary[rcId];
    setTimeout(() => {
      component.isVisible = true;
      component.forceUpdate();
    }, 1000)
  }

  componentDidMount() {
    const {rootMargin = '0px', threshold = 0, uniqId} = this.props;
    if (window.IntersectionObserver && !window.observer) {
      window.observer = new IntersectionObserver(this.onIntersection(this.load), {
        rootMargin,
        threshold
      });
    }
    if (window.observer) {
      window.observer.observe(ReactDOM.findDOMNode(this));
      if (!window.dictionary) {
        window.dictionary = {};
      }
      window.dictionary[uniqId] = this;
      const ele = ReactDOM.findDOMNode(this);
      if (ele.getAttribute) {
        ele.setAttribute('data-rcId', uniqId);
      }
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
