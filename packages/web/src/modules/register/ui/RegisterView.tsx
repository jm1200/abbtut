import React from "react";
import { Form as AntdForm, Icon, Button } from "antd";
import { withFormik, FormikErrors, FormikProps, Field, Form } from "formik";
import { validUserSchema } from "@abb/common";
import { InputField } from "../../shared/InputField";

interface IRegisterViewProps {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

interface FormValues {
  email: string;
  password: string;
}

interface Props {}

const C: React.FC<FormikProps<FormValues> & IRegisterViewProps> = () => {
  return (
    <Form>
      <div style={{ width: 400, margin: "auto" }}>
        <Field
          name="email"
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Email"
          component={InputField}
        />
        <Field
          name="password"
          type="password"
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Password"
          component={InputField}
        />

        <AntdForm.Item>
          <a className="login-form-forgot" href="# ">
            Forgot password
          </a>
        </AntdForm.Item>
        <AntdForm.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
        </AntdForm.Item>
        <AntdForm.Item>
          Or <a href="# ">login now!</a>
        </AntdForm.Item>
      </div>
    </Form>
  );
};

export const RegisterView = withFormik<IRegisterViewProps, FormValues>({
  validationSchema: validUserSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);
export default RegisterView;
