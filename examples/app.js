import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LazyLoad from'../src/lazyload';
import Test from './test';

class App extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {Array.apply(null, Array(10)).map((v, i) => {
          const uniqId = Math.floor(Math.random()* 1000000);
          return (
            <LazyLoad key={`lazy-${i}`} uniqId={uniqId}>
              <Test key={`test-${i}`} value={i}/>
            </LazyLoad>
          );
        })}
        
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
