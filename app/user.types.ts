import type {
  ActorKitSystemEvent,
  WithActorKitEvent,
  WithActorKitInput,
} from "actor-kit";
import { z } from "zod";
import {
  UserClientEventSchema,
  UserInputPropsSchema,
  UserServiceEventSchema,
} from "./user.schemas";

export type UserClientEvent = z.infer<typeof UserClientEventSchema>;
export type UserServiceEvent = z.infer<typeof UserServiceEventSchema>;
export type UserInput = WithActorKitInput<z.infer<typeof UserInputPropsSchema>>;

export type UserPublicContext = {
  ownerId: string;
  todos: Array<{ id: string; text: string; completed: boolean }>;
  lastSync: number | null;
};

type ChatId = string;
type SessionId = string;

export type UserPrivateContext = {
  chatIds: ChatId[];
  sessionIds: SessionId[];
};

export type UserEvent =
  | WithActorKitEvent<UserClientEvent, "client">
  | WithActorKitEvent<UserServiceEvent, "service">
  | ActorKitSystemEvent;
