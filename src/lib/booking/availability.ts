import type { AvailabilityProvider } from "./types";

/**
 * Default provider: no calendar connected, so availability is always
 * "unknown" and no dates are blocked. Replace with an implementation that
 * reads an iCal feed or your booking backend when ready.
 */
export const noAvailabilityProvider: AvailabilityProvider = {
  async check() {
    return "unknown";
  },
  async blockedDates() {
    return [];
  },
};

export const availabilityProvider: AvailabilityProvider = noAvailabilityProvider;
