package com.google.sps.data;

/** Class containing the data for Services. */
public final class Service {

  private final long id;
  private final String name;
  private final String description;
  private final long provider;
  private final long averageRating;

  /**
   * @param {!long} id The unique identifier for each Service.
   * @param {!String} name The name of this Service.
   * @param {!String} description The description of this Service.
   * @param {!long} provider The id of this Service's provider.
   * @param {!long} averageRating This Service's average Rating.
   */
  public Service(long id, String name, String description, long provider, String averageRating) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.provider = provider;
      this.averageRating = averageRating;
}

  /** Getter method for id. */
  public long getId() {
    return id;
  }

  /** Getter method for service name. */
  public String getName() {
    return name;
  }

  /** Getter method for service description. */
  public String getDesc() {
    return description;
  }

  /** Getter method for provider id. */
  public String getProviderId() {
    return provider;
  }

  /** Getter method for average rating. */
  public String getAverage() {
    return averageRating;
  }
}