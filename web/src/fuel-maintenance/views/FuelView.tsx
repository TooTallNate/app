import React from "react";
import BackButton from "../../common/components/view/BackButton";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import ViewTitle from "../../common/components/view/ViewTitle";

const FuelView: React.FC = () => {
  return (
    <View>
      <ViewHeader>
        <BackButton />
        <ViewTitle>Fuel</ViewTitle>
      </ViewHeader>
    </View>
  );
};

export default FuelView;
