import { IServiceDiscount } from "./ServiceDiscount";
import { ServiceType, ServiceYear, ServicePricesData } from "./types";

export class PriceCalculator {
  private readonly servicePrices: ServicePricesData;
  private readonly serviceDiscount: IServiceDiscount;

  constructor(servicePrices: ServicePricesData, serviceDiscount: IServiceDiscount) {
    this.servicePrices = servicePrices;
    this.serviceDiscount = serviceDiscount;
  }

  calculatePrice(services: ServiceType[], year: ServiceYear): { basePrice: number; finalPrice: number } {
    const hasPhotography = services.includes("Photography");
    const hasVideoRecording = services.includes("VideoRecording");

    let basePrice = services.reduce(
      (sum, service) => sum + this.getBasePrice(service, year, hasPhotography, hasVideoRecording),
      0
    );
    let discount = this.serviceDiscount.getDiscount(this.servicePrices, services, year);

    return {
      basePrice,
      finalPrice: basePrice - discount,
    };
  }

  private getBasePrice(
    serviceType: ServiceType,
    year: ServiceYear,
    hasPhotography: boolean,
    hasVideoRecording: boolean
  ) {
    if (serviceType === "BlurayPackage" && !hasVideoRecording) {
      return 0;
    }

    if (serviceType === "TwoDayEvent" && !hasPhotography && !hasVideoRecording) {
      return 0;
    }

    return this.servicePrices[serviceType][year];
  }
}
