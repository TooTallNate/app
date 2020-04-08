import React from "react";
import { RouteComponentProps } from "react-router";
import View from "../components/view/View";
import ViewHeader from "../components/view/ViewHeader";
import Button from "../components/input/Button";
import { useAuth } from "../contexts/auth";
import Title from "../components/view/ViewTitle";
import ViewContent from "../components/view/ViewContent";

const AccountView: React.FC<RouteComponentProps> = () => {
  const { logout } = useAuth();

  return (
    <View>
      <ViewHeader>
        <Title>Account</Title>
      </ViewHeader>
      <ViewContent>
        <div className="flex-grow" />
        <Button onClick={logout}>Log Out</Button>
      </ViewContent>
    </View>
  );
};

export default AccountView;
