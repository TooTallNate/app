export interface AnimalConfig {
  title: string;
  value: string;
}

interface ActionConfig {
  animals: AnimalConfig[];
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
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS, ANIMALS.SOWS]
  },
  GRADE_OFF: {
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS]
  },
  MORTALITY: {
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS, ANIMALS.SOWS]
  },
  MOVE: {
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS]
  },
  QTY_ADJ: {
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS, ANIMALS.SOWS]
  },
  WEAN: {
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS]
  }
};
