import React, {Component} from 'react';

class PrevDay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div onClick={this.props.remMethod}>
                x
            </div>
        )
    }
};

export default PrevDay;