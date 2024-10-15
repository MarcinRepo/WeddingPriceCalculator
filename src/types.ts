export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType =
  | "Photography"
  | "VideoRecording"
  | "BlurayPackage"
  | "TwoDayEvent"
  | "WeddingSession";

export interface ISelectionModel {
  readonly type: ServiceType;
  readonly isMain?: boolean;
  readonly related?: ServiceType[];
}

export type ServiceSelectionData = {
  [key in ServiceType]: ISelectionModel;
};

export type PriceData = {
  [key in ServiceYear]: number;
};

export type ServicePricesData = {
  [key in ServiceType]: PriceData;
};
