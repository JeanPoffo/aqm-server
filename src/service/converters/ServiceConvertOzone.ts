class ServiceConvertOzone {
  readonly BASE_VALUE_CONVERSION = 0.0409;

  readonly MOLECULAR_WEIGHT = 48.00;

  public execute(ozone: number): number {
    return this.BASE_VALUE_CONVERSION
      * ozone
      * this.MOLECULAR_WEIGHT;
  }
}

export default ServiceConvertOzone;
