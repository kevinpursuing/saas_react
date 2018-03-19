import React, { Component } from 'react';
import { connect } from 'react-redux'



@connect(
    state => state,
    {}
)
class AppIndex extends Component {

    componentDidMount = () => {
    }

    render() {
        return (
            <div>
                这是消息页
            </div>
        )
    }
}

export default AppIndex