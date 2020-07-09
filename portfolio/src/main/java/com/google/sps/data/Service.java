package com.google.sps.data;

/** Class containing the data for Services. */
public final class Service {

  private final long service_id;
  private final String service_name;
  private final String service_description;
  private final long provider_id;
  private final Double average_rating;

  /**
   * @param {!long} id The unique identifier for each Service.
   * @param {!String} name The name of this Service.
   * @param {!String} description The description of this Service.
   * @param {!long} provider The id of this Service's provider.
   * @param {!long} averageRating This Service's average Rating.
   */
  public Service(long service_id, String service_name, String service_description, long provider_id, Double average_rating) {
      this.service_id = service_id;
      this.service_name = service_name;
      this.service_description = service_description;
      this.provider_id = provider_id;
      this.average_rating = average_rating;
}

  /** Getter method for id. */
  public long getId() {
    return service_id;
  }

  /** Getter method for service name. */
  public String getName() {
    return service_name;
  }

  /** Getter method for service description. */
  public String getDesc() {
    return service_description;
  }

  /** Getter method for provider id. */
  public long getProviderId() {
    return provider_id;
  }

  /** Getter method for average rating. */
  public Double getAverage() {
    return average_rating;
  }
}