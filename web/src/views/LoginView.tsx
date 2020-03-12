/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import { useAuth } from "../contexts/auth";
import { Group, FormGroup } from "../components/styled";
import Title from "../components/ui/ViewTitle";
import View from "../components/ui/View";
import ViewHeader from "../components/ui/ViewHeader";
import TextInput from "../components/ui/TextInput";
import { useForm } from "react-hook-form";
import Form from "../components/ui/Form";
import FormField from "../components/ui/FormField";
import FormFieldLabel from "../components/ui/FormFieldLabel";
import FormFieldInput from "../components/ui/FormFieldInput";
import FormFieldErrors from "../components/ui/FormFieldErrors";
import FormSubmit from "../components/ui/FormSubmit";

interface FormData {
  username: string;
  password: string;
}

const LoginView: React.FC = () => {
  const { login } = useAuth();
  const [isInvalid, setInvalid] = useState<boolean>(false);
  const formContext = useForm<FormData>();

  return (
    <View>
      <ViewHeader>
        <Title>Login</Title>
      </ViewHeader>
      <Form
        context={formContext}
        onSubmit={async data => {
          try {
            setInvalid(false);
            await login(data.username, data.password);
          } catch {
            setInvalid(true);
          }
        }}
      >
        {isInvalid && (
          <Group>
            <div css={{ color: "red" }}>Username or password are invalid.</div>
          </Group>
        )}
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
