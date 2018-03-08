import React,{Component} from 'react';
import { Form, Icon, Input, Button,Checkbox} from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        this.props.form.validateFields();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                <FormItem validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                    {getFieldDecorator('username', { rules: [{ required: true, message: 'Please input your username' }] })(
                        <Input prefix={<Icon type="user" />} placeholder="user name" />
                    )}
                </FormItem>
                <FormItem validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                    {
                        getFieldDecorator('password', { rules: [{ required: true, message: "please enter your password" }] })(
                            <Input prefix={<Icon type="lock" />} type="password" placeholder="password" />
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('remember',{
                            valuePropName:'checked',
                            initialValue:true
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )
                    }
                </FormItem>
                <a class="login-form-forgot" href="">forgot password?</a>
                <FormItem>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>Log In</Button>
                </FormItem>
            </Form>
        )
    }
}
const WrappedHorizontalLoginForm=Form.create()(HorizontalLoginForm);
export default WrappedHorizontalLoginForm;