import React, { Component } from 'react';
import { Button } from 'antd';

export default class ButtonsDemo extends Component {
    render() {
        return (
            <div>
                <Button type="primary" loading="true">Submit</Button>
                <Button  >Submit</Button>
                <Button type="dashed" >Submit</Button>
                <Button type="danger" >Submit</Button>
            </div>
        )
    }
}
