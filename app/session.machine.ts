import type { CreateMachineProps } from "actor-kit";
import { setup } from "xstate";
import type { SessionEvent } from "./session.types";

export const createSessionMachine = ({ id, caller }: CreateMachineProps) =>
  setup({
    types: {
      context: {} as {
        public: {
          ownerId: string;
          todos: Array<{ id: string; text: string; completed: boolean }>;
          lastSync: number | null;
        };
        private: Record<
          string,
          {
            lastAccessTime?: number;
            userPreferences?: {
              theme: "light" | "dark";
              sortOrder: "asc" | "desc";
            };
          }
        >;
      },
      events: {} as SessionEvent,
    },
    actions: {},
    guards: {
      isOwner: ({ context, event }) =>
        event.caller.id === context.public.ownerId,
    },
  }).createMachine({
    id,
    type: "parallel",
    context: {
      public: {
        ownerId: caller.id,
        todos: [],
        lastSync: null,
      },
      private: {},
    },
    states: {
      Initialization: {
        initial: "Ready",
        states: {
          Ready: {},
        },
      },
    },
  });

export type SessionMachine = ReturnType<typeof createSessionMachine>;
