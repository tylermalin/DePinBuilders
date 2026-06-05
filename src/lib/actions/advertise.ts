"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  company: z.string().min(1, "Company name is required"),
  budget: z.string().min(1, "Budget range is required"),
  email: z.string().email("A valid email is required"),
});

export type AdvertiseFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitAdInquiry(
  _prev: AdvertiseFormState,
  formData: FormData,
): Promise<AdvertiseFormState> {
  const raw = {
    company: formData.get("company") as string,
    budget: formData.get("budget") as string,
    email: formData.get("email") as string,
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    if (prisma) {
      await prisma.adInquiry.create({
        data: parsed.data,
      });
    }
    return { success: true };
  } catch (err) {
    console.error("Ad inquiry submission error:", err);
    return { success: false, error: "Submission failed. Please try again." };
  }
}
