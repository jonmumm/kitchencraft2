import { z } from "zod";

// Base timestamp fields that many tables share
const TimestampFields = {
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
};

// User schemas
export const UserSchema = z.object({
  id: z.string(),
  ...TimestampFields,
});

export const UserEmailSchema = z.object({
  user_id: z.string(),
  email: z.string().email(),
  verified: z.boolean(),
  ...TimestampFields,
});

export const UserProfileSchema = z.object({
  user_id: z.string(),
  display_name: z.string().nullable(),
  full_name: z.string().nullable(),
  bio: z.string().nullable(),
  ...TimestampFields,
});

export const InsertUserSchema = z.object({
  id: z.string(),
});

export const InsertUserEmailSchema = z.object({
  user_id: z.string(),
  email: z.string().email(),
  verified: z.boolean().default(false),
});

export const InsertUserProfileSchema = z.object({
  user_id: z.string(),
  display_name: z.string().nullable(),
  full_name: z.string().nullable(),
  bio: z.string().nullable(),
});

// Message schemas
export const MessageRole = z.enum(["user", "assistant"]);
export const MessageType = z.enum(["text", "recipe", "image", "file"]);
export const IntentType = z.enum([
  "suggest_ideas",
  "adjust_recipe",
  "ask_recipe_question",
  "process_receipt_for_meal_plan",
  "process_ingredients_image",
]);

export const MessageSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  parent_id: z.string().nullable(),
  content: z.string(),
  role: MessageRole,
  type: MessageType,
  intent_type: IntentType.nullable(),
  created_at: z.string().datetime(),
});

export const InsertMessageSchema = MessageSchema.omit({
  created_at: true,
});

// Attachment schemas
export const FileType = z.enum(["image", "pdf", "document"]);

export const AttachmentSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  message_id: z.string(),
  file_path: z.string(),
  file_name: z.string(),
  file_type: FileType,
  mime_type: z.string(),
  size_bytes: z.number(),
  metadata: z.string().nullable(), // JSON string
  created_at: z.string().datetime(),
});

export const InsertAttachmentSchema = AttachmentSchema.omit({
  created_at: true,
});

// Intent-specific schemas
export const AdjustRecipeSchema = z.object({
  message_id: z.string(),
  recipe_id: z.string(),
});

export const AskRecipeQuestionSchema = z.object({
  message_id: z.string(),
  recipe_id: z.string(),
});

export const ProcessReceiptSchema = z.object({
  message_id: z.string(),
  attachment_id: z.string(),
});

export const ProcessIngredientsImageSchema = z.object({
  message_id: z.string(),
  attachment_id: z.string(),
  detected_ingredients: z.string(), // JSON string
});
