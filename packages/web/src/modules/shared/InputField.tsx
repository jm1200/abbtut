import React from "react";
import { FieldProps } from "formik";
import { Form, Input } from "antd";

export const InputField: React.SFC<FieldProps<any> & {}> = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];
  return (
    <Form.Item help={errorMsg} validateStatus={errorMsg ? "error" : ""}>
      <Input {...props} {...field} />
    </Form.Item>
  );
};
