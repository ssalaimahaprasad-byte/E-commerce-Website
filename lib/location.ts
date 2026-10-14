"use client";
import { useEffect, useState } from "react";

export interface DeliveryLocation {
  country: string;
  state: string;
  city: string;
  pincode: string;
  deliveryEstimate?: string;
  isServiceable: boolean;
}

export const STATES_AND_CITIES: Record<string, string[]> = {
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"],
  "Delhi": ["New Delhi", "Central Delhi", "South Delhi", "North Delhi", "Dwarka"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Uttar Pradesh": ["Noida", "Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj"],
  "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
};

export const DEFAULT_LOCATION: DeliveryLocation = {
  country: "India",
  state: "Tamil Nadu",
  city: "Chennai",
  pincode: "600001",
  deliveryEstimate: "Tomorrow, by 8 PM",
  isServiceable: true,
};

const STORAGE_KEY = "renzocart:location";

export function checkPincodeServiceability(pincode: string): { isServiceable: boolean; deliveryEstimate: string; message?: string } {
  const clean = pincode.trim();
  if (!/^\d{6}$/.test(clean)) {
    return {
      isServiceable: false,
      deliveryEstimate: "",
      message: "Please enter a valid 6-digit Indian PIN code.",
    };
  }

  // Known unserviceable sample test PIN
  if (clean === "999999" || clean === "000000") {
    return {
      isServiceable: false,
      deliveryEstimate: "",
      message: "Delivery is currently unavailable to this PIN code.",
    };
  }

  const prefix = clean.substring(0, 2);
  const num = parseInt(clean, 10);

  // Fast Metro delivery areas
  if (["11", "40", "60", "56", "50", "70"].includes(prefix)) {
    return {
      isServiceable: true,
      deliveryEstimate: "Tomorrow by 8 PM (Express Delivery)",
    };
  }

  // Tier 1 and 2 delivery
  if (num >= 100000 && num <= 855000) {
    return {
      isServiceable: true,
      deliveryEstimate: "Delivery within 2 - 3 business days",
    };
  }

  return {
    isServiceable: true,
    deliveryEstimate: "Standard delivery within 4 - 5 business days",
  };
}

export function getSavedLocation(): DeliveryLocation {
  if (typeof window === "undefined") return DEFAULT_LOCATION;
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("novacart:location");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.pincode) return parsed;
    }
  } catch (e) {
    // ignore parse error
  }
  return DEFAULT_LOCATION;
}

export function saveLocation(loc: DeliveryLocation): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
  window.dispatchEvent(new CustomEvent("renzocart:location-changed", { detail: loc }));
}

export function useLocation() {
  const [location, setLocation] = useState<DeliveryLocation>(DEFAULT_LOCATION);

  useEffect(() => {
    setLocation(getSavedLocation());

    const handleLocationChange = (e: any) => {
      if (e.detail?.pincode) {
        setLocation(e.detail);
      } else {
        setLocation(getSavedLocation());
      }
    };

    window.addEventListener("renzocart:location-changed", handleLocationChange);
    window.addEventListener("storage", handleLocationChange);

    return () => {
      window.removeEventListener("renzocart:location-changed", handleLocationChange);
      window.removeEventListener("storage", handleLocationChange);
    };
  }, []);

  const updateLocation = (newLoc: Partial<DeliveryLocation> & { pincode: string }) => {
    const serviceability = checkPincodeServiceability(newLoc.pincode);
    const completeLoc: DeliveryLocation = {
      country: newLoc.country || "India",
      state: newLoc.state || "Tamil Nadu",
      city: newLoc.city || "Chennai",
      pincode: newLoc.pincode.trim(),
      deliveryEstimate: serviceability.deliveryEstimate,
      isServiceable: serviceability.isServiceable,
    };
    saveLocation(completeLoc);
    setLocation(completeLoc);
    return serviceability;
  };

  return { location, updateLocation, checkPincodeServiceability };
}
