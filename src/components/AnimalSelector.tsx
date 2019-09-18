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

interface AnimalSelectorProps {
  title: string;
  animals: Animal[];
  value?: Animal;
  onChange?: (animal: Animal) => void;
  className?: string;
}

const AnimalSelector: React.FC<AnimalSelectorProps> = ({
  title,
  animals,
  value,
  onChange,
  className
}) => {
  return (
    <fieldset
      className={className}
      css={{
        border: "none",
        padding: 0,
        margin: 0
      }}
    >
      <legend
        css={{
          padding: 0,
          fontSize: "1rem",
          fontWeight: "bold",
          boxSizing: "border-box",
          height: 44,
          lineHeight: "44px"
        }}
      >
        {title}
      </legend>
      <Selector
        items={animals.map(value => ({
          value,
          title: animalTitle(value)
        }))}
        value={value}
        onChange={onChange}
      />
    </fieldset>
  );
};

export default AnimalSelector;
