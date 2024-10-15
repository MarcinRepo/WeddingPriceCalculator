import { ServiceType, ServiceYear, ServicePricesData } from "./Service";

export interface IServiceDiscount {
  getDiscount(basePrices: ServicePricesData, services: ServiceType[], year: ServiceYear): number;
}

export class ServiceDiscount implements IServiceDiscount {
  getDiscount(basePrices: ServicePricesData, services: ServiceType[], year: ServiceYear): number {
    const hasPhotography = services.includes("Photography");
    const hasVideoRecording = services.includes("VideoRecording");
    const hasWeddingSession = services.includes("WeddingSession");
    let discountSum: number = 0;

    if (hasPhotography && hasVideoRecording) {
      let newPrice = this.getPhotographyVideoPackageDiscountedPrice(year);
      let basePrice = basePrices.Photography[year] + basePrices.VideoRecording[year];
      discountSum += basePrice - newPrice;
    }

    if (hasWeddingSession && (hasPhotography || hasVideoRecording)) {
      let newPrice = this.getWeddingSessionDiscountedPrice(year, hasPhotography);
      let basePrice = basePrices.WeddingSession[year];
      discountSum += basePrice - newPrice;
    }

    return discountSum;
  }

  private getPhotographyVideoPackageDiscountedPrice(year: ServiceYear): number {
    const packagePrices = { 2020: 2200, 2021: 2300, 2022: 2500 };
    return packagePrices[year]; // Discounted price for Photography + Video Recording
  }

  private getWeddingSessionDiscountedPrice(year: ServiceYear, hasPhotography: boolean): number {
    if (hasPhotography && year === 2022) {
      return 0; // Free in 2022 with Photography
    }
    return 300; // Discounted price for Wedding Session when combined
  }
}
