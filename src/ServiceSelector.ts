import { ServiceType, ISelectionModel, ServiceSelectionData } from "./Service";

export class ServiceSelector {
  private selectedServices: ISelectionModel[] = [];

  constructor(private readonly serviceData: ServiceSelectionData, selectedServicesTypes: ServiceType[]) {
    selectedServicesTypes.forEach((serviceType) => {
      this.selectedServices.push(serviceData[serviceType]);
    });
  }

  select(service: ServiceType) {
    if (this.isAlreadySelected(service)) {
      return;
    }
    var model = this.serviceData[service];

    if (model.isMain || this.isRelatedOnSelectedService(service)) {
      this.selectedServices.push(model);
    }
  }

  deselect(service: ServiceType) {
    this.selectedServices = this.selectedServices.filter((s) => s.type !== service);

    let relatedServices = this.getRelatedServices();
    this.selectedServices = this.filteroutRelatedServicesWithoutMainServices(relatedServices);
  }

  getSelectedServices(): ServiceType[] {
    return this.selectedServices.map((s) => s.type);
  }

  private isAlreadySelected(service: ServiceType): boolean {
    return this.selectedServices.some((s) => s.type === service);
  }

  private isRelatedOnSelectedService(service: ServiceType): boolean {
    return this.selectedServices.some((s) => s.related?.includes(service));
  }

  private getRelatedServices(): Set<ServiceType> {
    let relatedServices = new Set<ServiceType>();
    this.selectedServices.forEach((s) => {
      s.related?.forEach((r) => relatedServices.add(r));
    });
    return relatedServices;
  }

  private filteroutRelatedServicesWithoutMainServices(
    validRelatedServcies: Set<ServiceType>
  ): ISelectionModel[] {
    return this.selectedServices.filter((s) => s.isMain || validRelatedServcies.has(s.type));
  }
}
