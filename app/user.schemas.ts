import { z } from "zod";

export const UserClientEventSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("NEW_MESSAGE"),
    text: z.string(),
    messageId: z.string(),
    threadId: z.string(),
  }),
]);

const RecipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
});

export const UserServiceEventSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("SYNC_RECIPES"),
    recipes: z.array(RecipeSchema),
  }),
]);

export const UserInputPropsSchema = z.object({
  sessionId: z.string(),
});
