class ServiceConvertCarbonMonoxide {
  readonly BASE_VALUE_CONVERSION = 0.0409;

  readonly MOLECULAR_WEIGHT = 28.01;

  public execute(carbonMonoxide: number): number {
    return this.BASE_VALUE_CONVERSION
      * carbonMonoxide
      * this.MOLECULAR_WEIGHT;
  }
}

export default ServiceConvertCarbonMonoxide;
