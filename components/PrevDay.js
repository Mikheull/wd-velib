import React, {Component} from 'react';

class PrevDay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div onClick={this.props.remMethod}>
                <img src="images/icons/arrow-left-circle.svg" alt=""/>
            </div>
        )
    }
};

export default PrevDay;