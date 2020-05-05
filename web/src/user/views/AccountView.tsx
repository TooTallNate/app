import React from "react";
import { RouteComponentProps } from "react-router";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import Button from "../../common/components/input/Button";
import { useAuth } from "../contexts/auth";
import Title from "../../common/components/view/ViewTitle";
import ViewContent from "../../common/components/view/ViewContent";

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
