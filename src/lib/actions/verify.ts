"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  project: z.string().min(1, "Project name is required"),
  category: z.string().min(1, "Category is required"),
  website: z.string().url("A valid URL is required"),
  email: z.string().email("A valid email is required"),
});

export type VerifyFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitVerification(
  _prev: VerifyFormState,
  formData: FormData,
): Promise<VerifyFormState> {
  const raw = {
    project: formData.get("project") as string,
    category: formData.get("category") as string,
    website: formData.get("website") as string,
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
      await prisma.verificationRequest.create({
        data: parsed.data,
      });
    }
    return { success: true };
  } catch (err) {
    console.error("Verification submission error:", err);
    return { success: false, error: "Submission failed. Please try again." };
  }
}
