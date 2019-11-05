/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Title } from "../components/styled";
import Selector from "../components/ui/Selector";
import Field from "../components/ui/Field";

const LOCATIONS = [
  { title: "None", value: "none" },
  { title: "Nursury/Finisher", value: "nursury" },
  { title: "Sow Barn", value: "sows" }
];

const SelectLocationView: React.FC = () => {
  return (
    <div>
      <Title>Location</Title>
      <form
        css={{
          padding: "0 16px"
        }}
      >
        <Field label="Default Location" name="default-location">
          <Selector items={LOCATIONS}></Selector>
        </Field>
      </form>
    </div>
  );
};

export default SelectLocationView;
