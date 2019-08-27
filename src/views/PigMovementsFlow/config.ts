export interface AnimalConfig {
  title: string;
  value: string;
}

export interface ActionConfig {
  title: string;
  value: string;
  animals: AnimalConfig[];
  steps: string[];
}

export interface FormState {
  formPath: string;
  step: number;
  action?: string;
  animal?: string;
  group?: string;
  fromAnimal?: string;
  toAnimal?: string;
  quantity?: number;
  weight?: number;
  price?: number;
}

export const ANIMALS: {
  [animal: string]: AnimalConfig;
  MKT_PIGS: AnimalConfig;
  GDU_PIGS: AnimalConfig;
  SOWS: AnimalConfig;
} = {
  MKT_PIGS: {
    title: "Market Pigs",
    value: "MKT_PIGS"
  },
  GDU_PIGS: {
    title: "GDU Pigs",
    value: "GDU_PIGS"
  },
  SOWS: {
    title: "Sows",
    value: "SOWS"
  }
};

export const ACTIONS: {
  [action: string]: ActionConfig;
  PURCHASE: ActionConfig;
  GRADE_OFF: ActionConfig;
  MORTALITY: ActionConfig;
  MOVE: ActionConfig;
  QTY_ADJ: ActionConfig;
  WEAN: ActionConfig;
} = {
  PURCHASE: {
    value: "PURCHASE",
    title: "Purchase",
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS, ANIMALS.SOWS],
    steps: ["animal", "group", "quantity", "weight", "price", "submit"]
  },
  GRADE_OFF: {
    value: "GRADE_OFF",
    title: "Grade Off",
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS],
    steps: ["animal", "group", "quantity", "weight", "submit"]
  },
  MORTALITY: {
    value: "MORTALITY",
    title: "Mortality",
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS, ANIMALS.SOWS],
    steps: ["animal", "group", "quantity", "weight", "submit"]
  },
  MOVE: {
    value: "MOVE",
    title: "Move",
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS],
    steps: ["from-animal", "quantity", "to-animal", "weight", "submit"]
  },
  QTY_ADJ: {
    value: "QTY_ADJ",
    title: "Adjustment",
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS, ANIMALS.SOWS],
    steps: ["animal", "group", "quantity", "weight", "submit"]
  },
  WEAN: {
    value: "WEAN",
    title: "Wean",
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS],
    steps: ["animal", "group", "quantity", "weight", "submit"]
  }
};
