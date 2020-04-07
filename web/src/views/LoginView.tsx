/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  useAuth,
  InvalidCredentialsError,
  NoAvailableLicenseError
} from "../contexts/auth";
import { FormGroup } from "../components/styled";
import Title from "../components/ui/ViewTitle";
import View from "../components/ui/View";
import ViewHeader from "../components/ui/ViewHeader";
import TextInput from "../components/ui/TextInput";
import { useForm, OnSubmit } from "react-hook-form";
import Form from "../components/ui/Form";
import FormField from "../components/ui/FormField";
import FormFieldLabel from "../components/ui/FormFieldLabel";
import FormFieldInput from "../components/ui/FormFieldInput";
import FormFieldErrors from "../components/ui/FormFieldErrors";
import FormSubmit from "../components/ui/FormSubmit";
import { useHistory } from "react-router-dom";
import { useFlash } from "../contexts/flash";

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
    </View>
  );
};

export default LoginView;
