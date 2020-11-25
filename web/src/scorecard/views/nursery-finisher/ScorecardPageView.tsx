import React from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import Title from "../../../common/components/view/ViewTitle";
import View from "../../../common/components/view/View";
import ViewHeader from "../../../common/components/view/ViewHeader";
import FormField from "../../../common/components/form/FormField";
import FormFieldInput from "../../../common/components/form/FormFieldInput";
import BackButton from "../../../common/components/view/BackButton";
import TypeaheadInput from "../../../common/components/input/TypeaheadInput";
import Form from "../../../common/components/form/Form";
import { useForm, OnSubmit } from "react-hook-form";
import FormSubmit from "../../../common/components/form/FormSubmit";
import FormFieldErrors from "../../../common/components/form/FormFieldErrors";
import ViewContent from "../../../common/components/view/ViewContent";
import { useScorecardJobsQuery } from "../../graphql";
import { useGrowFinish } from "../../contexts/growFinish";
import ScorecardYesNo from "../../components/ScorecardYesNo";

interface FormData {
  job: string;
}

const ScorecardJobView: React.FC = () => {
  const params = useParams<{ page: string }>();
  const { formConfig } = useGrowFinish();
  const formContext = useForm();

  const pageNumber = parseInt(params.page);
  const pageConfig = formConfig[pageNumber - 1];

  console.log(formContext.getValues());

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>{(pageConfig && pageConfig.title) || "Page"}</Title>
      </ViewHeader>
      <ViewContent>
        <Form context={formContext}>
          {pageConfig &&
            pageConfig.elements.map(element => {
              switch (element.code) {
                case "YN":
                  return (
                    <ScorecardYesNo
                      key={element.label}
                      label={element.label}
                      name="test"
                    />
                  );
                default:
                  return null;
              }
            })}
          <FormSubmit>Continue</FormSubmit>
        </Form>
      </ViewContent>
    </View>
  );
};

export default ScorecardJobView;
