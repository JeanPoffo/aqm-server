class ServiceConvertParticulateMaterialTwoFive {
  readonly BASE_VALUE_CONVERSION = 0.0409;

  readonly MOLECULAR_WEIGHT = 1;

  public execute(particulateMaterialTwoFive: number): number {
    return this.BASE_VALUE_CONVERSION
      * particulateMaterialTwoFive
      * this.MOLECULAR_WEIGHT;
  }
}

export default ServiceConvertParticulateMaterialTwoFive;
