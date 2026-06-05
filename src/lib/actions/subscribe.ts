"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  email: z.string().email("A valid email is required"),
});

export type SubscribeFormState = {
  success: boolean;
  error?: string;
};

export async function subscribeNewsletter(
  _prev: SubscribeFormState,
  formData: FormData,
): Promise<SubscribeFormState> {
  const parsed = schema.safeParse({
    email: formData.get("email") as string,
  });

  if (!parsed.success) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    if (prisma) {
      await prisma.subscriber.upsert({
        where: { email: parsed.data.email },
        update: {},
        create: { email: parsed.data.email },
      });
    }

    // Resend integration (Phase 7+): send welcome email
    // if (process.env.RESEND_API_KEY) { ... }

    return { success: true };
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    return { success: false, error: "Subscription failed. Please try again." };
  }
}
