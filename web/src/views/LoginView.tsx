/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  useAuth,
  InvalidCredentialsError,
  NoAvailableLicenseError
} from "../contexts/auth";
import { FormGroup } from "../components/styled";
import Title from "../components/view/ViewTitle";
import View from "../components/view/View";
import ViewHeader from "../components/view/ViewHeader";
import TextInput from "../components/input/TextInput";
import { useForm, OnSubmit } from "react-hook-form";
import Form from "../components/form/Form";
import FormField from "../components/form/FormField";
import FormFieldLabel from "../components/form/FormFieldLabel";
import FormFieldInput from "../components/form/FormFieldInput";
import FormFieldErrors from "../components/form/FormFieldErrors";
import FormSubmit from "../components/form/FormSubmit";
import { useHistory } from "react-router-dom";
import { useFlash } from "../contexts/flash";
import ViewContent from "../components/view/ViewContent";

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
