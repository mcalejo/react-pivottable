import React, { Component } from 'react';

class DisplayObject extends Component {

    constructor(props) {
        super(props);
        this.state = {
          content: props.content
        };
    }

    render() {
      const Fragment = React.Fragment;
      return (
        <Fragment>
          <ol>
            {
              Object.keys(this.state.content).map((key) => {
                return <li><b>{key}</b>:{JSON.stringify(this.state.content[key])}</li>
             })             
            }
          </ol>
        </Fragment>
      )
    }
}

export default DisplayObject
