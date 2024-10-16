import type { ActorKitStateMachine } from "actor-kit";
import { setup } from "xstate";
import type {
  UserEvent,
  UserInput,
  UserPrivateContext,
  UserPublicContext,
} from "./user.types";

export const userMachine = setup({
  types: {
    context: {} as {
      public: UserPublicContext;
      private: Record<string, UserPrivateContext>;
    },
    events: {} as UserEvent,
    input: {} as UserInput,
  },
  actions: {},
  guards: {
    isOwner: ({ context, event }) => event.caller.id === context.public.ownerId,
  },
}).createMachine({
  id: "user",
  type: "parallel",
  context: ({ input }: { input: UserInput }) => ({
    public: {
      ownerId: input.caller.id,
      todos: [],
      lastSync: null,
    },
    private: {
      [input.caller.id]: {
        chatIds: [],
        sessionIds: [],
      },
    },
  }),
  states: {
    Initialization: {
      initial: "Ready",
      states: {
        Ready: {},
      },
    },
  },
}) satisfies ActorKitStateMachine<
  UserEvent,
  UserInput,
  UserPrivateContext,
  UserPublicContext
>;

export type UserMachine = typeof userMachine;
