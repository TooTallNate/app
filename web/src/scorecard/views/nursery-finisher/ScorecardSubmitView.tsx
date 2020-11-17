import React from "react";
import { useGrowFinish } from "../../contexts/growFinish";
import ViewContent from "../../../common/components/view/ViewContent";
import View from "../../../common/components/view/View";
import Title from "../../../common/components/view/ViewTitle";
import ViewHeader from "../../../common/components/view/ViewHeader";
import BackButton from "../../../common/components/view/BackButton";

const ScorecardSubmitView: React.FC = () => {
  const { job, formState } = useGrowFinish();

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Submit</Title>
      </ViewHeader>
      <ViewContent>
        <div>{job}</div>
        <div>{JSON.stringify(formState)}</div>
      </ViewContent>
    </View>
  );
};

export default ScorecardSubmitView;
