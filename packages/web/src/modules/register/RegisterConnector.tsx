import React from "react";
import { RegisterController } from "@abb/controller";
import RegisterView from "./ui/RegisterView";

interface IRegisterConnectorProps {}

const RegisterConnector: React.FC<IRegisterConnectorProps> = props => {
  return (
    <>
      <RegisterController>
        {({ submit }: { submit: any }) => <RegisterView submit={submit} />}
      </RegisterController>
    </>
  );
};

export default RegisterConnector;
