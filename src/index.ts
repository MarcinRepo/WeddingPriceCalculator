import { ServiceSelectionData, ServicePricesData, ServiceType, ServiceYear } from "./types";
import { ServiceSelector } from "./ServiceSelector";
import { PriceCalculator } from "./PriceCalculator";
import { ServiceDiscount } from "./ServiceDiscount";

const serviceSelectionConfig: ServiceSelectionData = {
  Photography: { type: "Photography", isMain: true, related: ["TwoDayEvent"] },
  VideoRecording: { type: "VideoRecording", isMain: true, related: ["BlurayPackage", "TwoDayEvent"] },
  BlurayPackage: { type: "BlurayPackage" },
  TwoDayEvent: { type: "TwoDayEvent" },
  WeddingSession: { type: "WeddingSession", isMain: true },
};

const servicePrices: ServicePricesData = {
  Photography: {
    2020: 1700,
    2021: 1800,
    2022: 1900,
  },
  VideoRecording: {
    2020: 1700,
    2021: 1800,
    2022: 1900,
  },
  WeddingSession: {
    2020: 600,
    2021: 600,
    2022: 600,
  },
  BlurayPackage: {
    2020: 300,
    2021: 300,
    2022: 300,
  },
  TwoDayEvent: {
    2020: 400,
    2021: 400,
    2022: 400,
  },
};

const priceCalculator = new PriceCalculator(servicePrices, new ServiceDiscount());

export const updateSelectedServices = (
  previouslySelectedServices: ServiceType[],
  action: { type: "Select" | "Deselect"; service: ServiceType }
): string[] => {
  var serviceSelector = new ServiceSelector(serviceSelectionConfig, previouslySelectedServices);

  switch (action.type) {
    case "Select":
      serviceSelector.select(action.service);
      break;
    case "Deselect":
      serviceSelector.deselect(action.service);
      break;
  }

  return serviceSelector.getSelectedServices();
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => {
  return priceCalculator.calculatePrice(selectedServices, selectedYear);
};
