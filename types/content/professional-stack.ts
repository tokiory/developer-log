export interface ProfessionalStackItemContent {
  title: string;
  timeInUse: {
    amount: string;
    count: number;
  };
  description: string;
}

export interface ProfessionalStackContent {
  list: ProfessionalStackItemContent[]
}
