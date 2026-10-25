import { z } from "zod";
import { isAfter, startOfDay } from "date-fns";
import { property } from "@/data/property";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s().-]{7,20}$/;

export const inquirySchema = z
  .object({
    checkIn: z.date({ error: "Choose a check-in date." }),
    checkOut: z.date({ error: "Choose a check-out date." }),
    guests: z
      .number({ error: "How many guests?" })
      .int()
      .min(1, "At least one guest.")
      .max(property.maxGuests, `The house sleeps up to ${property.maxGuests} guests.`),
    name: z.string().trim().min(2, "Please tell us your name.").max(80, "That name is a little long."),
    contact: z
      .string()
      .trim()
      .min(5, "Add a phone number or e-mail so we can reply.")
      .max(120)
      .refine((v) => EMAIL.test(v) || PHONE.test(v), "Enter a valid phone number or e-mail address."),
    message: z.string().trim().max(600, "Please keep the message under 600 characters.").optional().or(z.literal("")),
  })
  .refine((d) => !isAfter(startOfDay(new Date()), startOfDay(d.checkIn)), {
    path: ["checkIn"],
    message: "Check-in cannot be in the past.",
  })
  .refine((d) => isAfter(startOfDay(d.checkOut), startOfDay(d.checkIn)), {
    path: ["checkOut"],
    message: "Check-out must be after check-in.",
  });

export type InquiryInput = z.input<typeof inquirySchema>;
export type InquiryValues = z.output<typeof inquirySchema>;
