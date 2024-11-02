import type {
  ActorKitSystemEvent,
  ActorServer,
  AnyActorKitStateMachine,
  BaseActorKitEvent,
  CallerSnapshotFrom,
  EnvWithDurableObjects,
  WithActorKitEvent,
  WithActorKitInput,
} from "actor-kit";
import type { Operation } from "fast-json-patch";
import { ActorRefFromLogic } from "xstate";
import { z } from "zod";
import { ThreadMachine } from "./thread.machine";
import {
  UserClientEventSchema,
  UserInputPropsSchema,
  UserServiceEventSchema,
} from "./user.schemas";
import { fromActorKit } from "./utils";

export type UserClientEvent = z.infer<typeof UserClientEventSchema>;
export type UserServiceEvent = z.infer<typeof UserServiceEventSchema>;
export type UserInput = WithActorKitInput<z.infer<typeof UserInputPropsSchema>>;

export const actorKitThread = fromActorKit<ThreadMachine>("THREAD");

type ThreadId = string;
type ThreadActorRef = ActorRefFromLogic<typeof actorKitThread>;

export type UserPublicContext = {
  ownerId: string;
  lastSync: number | null;
};

export type UserPrivateContext = {
  recentThreadIds: ThreadId[];
  activeThreads: Partial<Record<ThreadId, ThreadActorRef>>;
};

export type ActorKitEmitted<
  TActorType extends string,
  TMachine extends AnyActorKitStateMachine
> =
  | {
      type: `${TActorType}_INITIALIZED`;
      actorType: TActorType;
      actorId: string;
      snapshot: CallerSnapshotFrom<TMachine>;
    }
  | {
      type: `${TActorType}_UPDATED`;
      actorType: TActorType;
      actorId: string;
      snapshot: CallerSnapshotFrom<TMachine>;
      operations: Operation[];
    }
  | {
      type: `${TActorType}_ERROR`;
      actorType: TActorType;
      actorId: string;
      error: Error;
    };

export type UserEvent =
  | (
      | WithActorKitEvent<UserClientEvent, "client">
      | WithActorKitEvent<UserServiceEvent, "service">
      | ActorKitSystemEvent
      | ActorKitEmitted<"THREAD", ThreadMachine>
    ) &
      BaseActorKitEvent<
        EnvWithDurableObjects & {
          THREAD: DurableObjectNamespace<ActorServer<ThreadMachine>>;
        }
      >;
