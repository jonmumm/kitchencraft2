import type {
  ActorKitSystemEvent,
  BaseActorKitEvent,
  EnvWithDurableObjects,
  WithActorKitEvent,
  WithActorKitInput,
} from "actor-kit";
import { z } from "zod";
import {
  ThreadClientEventSchema,
  ThreadInputPropsSchema,
  ThreadServiceEventSchema,
} from "./thread.schemas";

export type ThreadClientEvent = z.infer<typeof ThreadClientEventSchema>;
export type ThreadServiceEvent = z.infer<typeof ThreadServiceEventSchema>;
export type ThreadInput = WithActorKitInput<
  z.infer<typeof ThreadInputPropsSchema>
>;

export type ThreadPublicContext = {
  ownerId: string;
  createdAt: number;
  lastMessageAt: number;
};

export type ThreadPrivateContext = {
  userIds: string[];
};

export type ThreadPersistedContext = {
  public: ThreadPublicContext;
  private: Record<string, ThreadPrivateContext>;
};

export type ThreadEvent = (
  | WithActorKitEvent<ThreadClientEvent, "client">
  | WithActorKitEvent<ThreadServiceEvent, "service">
  | ActorKitSystemEvent
) &
  BaseActorKitEvent<EnvWithDurableObjects>;
