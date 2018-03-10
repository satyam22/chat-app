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
    },
    {
        value: 'maharastra',
        label: 'maharastra',
        children: [{
            value: 'Nagpur',
            label: 'Nagpur'
        },
        {
            value: 'Pune',
            label: 'Pune'
        }
        ]
    }
]
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
                <Option value="89">+89</Option>
            </Select>
        )
        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>))
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="E-mail">
                    {
                        getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail'
                            }, {
                                required: true,
                                message: 'Please input your E-mail'
                            }]
                        })(<Input placeholder="email" />)
                    }</FormItem>
                <FormItem {...formItemLayout} label="Password">
                    {
                        getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!'
                            }, {
                                validator: this.validateToNextPassword
                            }]
                        })(<Input type="password" />)
                    }</FormItem>
                <FormItem {...formItemLayout} label="Confirm Password">
                    {
                        getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true, message: 'Please confirm your password!'
                                }, {
                                    validator: this.compareToFirstPassword
                                }
                            ]
                        })(<Input type="password" onBlur={this.handleConfirmBlur} />)
                    }</FormItem>
                <FormItem {...formItemLayout}
                    label={(
                        <span>
                            Nickname&nbsp;
                        <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}>
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!' }]
                    })(<Input />)
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="Residence Address">
                    {
                        getFieldDecorator('residence', {
                            rules: [{
                                type: 'array', required: true, message: 'Please select your residence Address'
                            }]
                        })(<Cascader options={residences} />)
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="Phone Number">
                    {
                        getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone number' }]
                        })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)
                    }</FormItem>
                <FormItem {...formItemLayout} label="Website">
                    {getFieldDecorator('website', {
                        rules: [{ required: true, message: 'Please input website!' }]
                    })(<AutoComplete dataSource={websiteOptions} onChange={this.handleWebsiteChange} placeholder="website">
                        <Input />
                    </AutoComplete>)
                    }</FormItem>
                    <FormItem {...formItemLayout} label="Captcha" extra="We must make sure than you are a human.">
                    <Row gutter={8}>
                    <Col span={12}>
                    {getFieldDecorator('captcha',{
                        rules:[{required:true,message:'Please input the captcha you got!'},
                    ]
                    })(<Input />)
                    }
                    </Col>
                    <Col span={12}>
                    <Button>Get captcha</Button>
                    </Col>
                    </Row>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('aggrement',{
                        valuePropName:'checked',
                    })(<Checkbox>I have read the <a href="">aggrement</a></Checkbox>)}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button></FormItem>
            </Form>
        )
    }
}
const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm;