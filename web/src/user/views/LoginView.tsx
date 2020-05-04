import React from "react";
import {
  useAuth,
  InvalidCredentialsError,
  NoAvailableLicenseError
} from "../contexts/auth";
import { FormGroup } from "../../common/components/styled";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import TextInput from "../../common/components/input/TextInput";
import { useForm, OnSubmit } from "react-hook-form";
import Form from "../../common/components/form/Form";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormSubmit from "../../common/components/form/FormSubmit";
import { useHistory } from "react-router-dom";
import { useFlash } from "../../common/contexts/flash";
import ViewContent from "../../common/components/view/ViewContent";

interface FormData {
  username: string;
  password: string;
}

const LoginView: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();
  const { addMessage } = useFlash();
  const formContext = useForm<FormData>({
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const onSubmit: OnSubmit<FormData> = async data => {
    try {
      await login(data.username, data.password);
      history.push("/");
    } catch (e) {
      if (e instanceof InvalidCredentialsError) {
        addMessage({
          message: "Username or password are incorrect.",
          level: "error"
        });
      } else if (e instanceof NoAvailableLicenseError) {
        addMessage({
          message: "No license is available to access NAV.",
          level: "error"
        });
      } else {
        addMessage({
          message: "An unknown error occred.",
          level: "error"
        });
      }
    }
  };

  return (
    <View>
      <ViewHeader>
        <Title>Login</Title>
      </ViewHeader>
      <ViewContent>
        <Form context={formContext} onSubmit={onSubmit}>
          <FormField
            name="username"
            rules={{ required: "The username field is required." }}
          >
            <FormFieldLabel>Username</FormFieldLabel>
            <FormFieldInput>
              <TextInput />
            </FormFieldInput>
            <FormFieldErrors />
          </FormField>
          <FormField
            name="password"
            rules={{ required: "The password field is required." }}
          >
            <FormFieldLabel>Password</FormFieldLabel>
            <FormFieldInput>
              <TextInput type="password" />
            </FormFieldInput>
            <FormFieldErrors />
          </FormField>
          <FormGroup>
            <FormSubmit>Log In</FormSubmit>
          </FormGroup>
        </Form>
      </ViewContent>
    </View>
  );
};

export default LoginView;
