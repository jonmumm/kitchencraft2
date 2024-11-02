import { z } from "zod";

export const ThreadClientEventSchema = z.never();

export const ThreadServiceEventSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("NEW_MESSAGE"),
    content: z.string(),
  }),
]);

export const ThreadInputPropsSchema = z.object({});
