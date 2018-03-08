import React, { Component } from 'react';
import { Icon, Button, Input, AutoComplete, Cascader, Select, Row, Col, Tooltip, Form, Checkbox } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
    value: 'india',
    label: 'india',
    children: [{
        value: 'madhya pradesh',
        label: 'madhya pradesh',
        children: [{
            value: 'Gwalior',
            label: 'gwalior'
        },
        {
            value: 'Indore',
            label: 'indore'
        }
        ]
    }]
}];
class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: []
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('form values:', values);
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        }
        else {
            callback();
        }
    }
    validateToNextPassword = (rules, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        else {
            callback();
        }
    }
    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        }
        else {
            autoCompleteResult = ['.com', '.org', '.net', '.io'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };
        const prefixSelector = getFieldDecorator('prefix', { initialValue: '91' })(
            <Select style={{ width: 70 }}>
                <Option value="91">+91</Option>
                <Option value="91">+89</Option>
            </Select>
        )
        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>))
    }
}
