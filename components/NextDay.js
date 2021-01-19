import React, {Component} from 'react';

class NextDay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div onClick={this.props.addMethod}>
                <img src="images/icons/arrow-right-circle.svg" alt=""/>
            </div>
        )
    }
};

export default NextDay;