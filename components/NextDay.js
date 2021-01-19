import React, {Component} from 'react';

class NextDay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div onClick={this.props.addMethod}>
                x
            </div>
        )
    }
};

export default NextDay;