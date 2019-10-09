/** @jsx jsx */
import { jsx } from "@emotion/core";
import Selector from "./ui/Selector";
import { Animal } from "../entities";

function animalTitle(animal: Animal) {
  switch (animal) {
    case Animal.GDU_PIGS:
      return "GDU Pigs";
    case Animal.MARKET_PIGS:
      return "Market Pigs";
    case Animal.SOWS:
      return "Sows";
  }
}

interface AnimalSelectorProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "value" | "onChange"
  > {
  animals: Animal[];
  value?: Animal;
  onChange?: (animal: Animal) => void;
}

const AnimalSelector: React.FC<AnimalSelectorProps> = ({
  animals,
  ...props
}) => {
  return (
    <Selector
      {...props}
      items={animals.map(value => ({
        value,
        title: animalTitle(value)
      }))}
    />
  );
};

export default AnimalSelector;
