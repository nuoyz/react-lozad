import React, { Component } from 'react';

class Test extends Component {
  render() {
    const {value} = this.props;
    return (
      <div
        style={{
          width: 200,
          height: 200,
          textAlign: 'center',
          lineHeight: '200px',
          border: '1px solid black'
        }}
      >
        {value}
      </div>
    );
  }
}

export default Test;
