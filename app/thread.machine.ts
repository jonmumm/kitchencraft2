import { ActorKitStateMachine } from "actor-kit";
import { setup } from "xstate";
import {
  ThreadEvent,
  ThreadInput,
  ThreadPersistedContext,
} from "./thread.types";

export const threadMachine = setup({
  types: {
    context: {} as ThreadPersistedContext,
    events: {} as ThreadEvent,
    input: {} as ThreadInput,
  },
  actors: {},
  guards: {},
}).createMachine({
  id: "user",
  type: "parallel",
  context: ({ input }: { input: ThreadInput }) => {
    console.log("THREAD CONTEXT", input);
    return {
      public: {
        ownerId: input.caller.id,
        createdAt: Date.now(),
        lastMessageAt: Date.now(),
      },
      private: {},
    };
  },
  states: {
    Initialization: {
      on: {
        NEW_MESSAGE: {
          actions: ({ event }: { event: ThreadEvent }) => {
            console.log("THREAD NEW_MESSAGE", event);
          },
        },
      },
    },
  },
}) satisfies ActorKitStateMachine<
  ThreadEvent,
  ThreadInput,
  ThreadPersistedContext
>;

export type ThreadMachine = typeof threadMachine;
