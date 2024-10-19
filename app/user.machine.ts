import type { ActorKitStateMachine } from "actor-kit";
import { setup } from "xstate";
import type {
  UserEvent,
  UserInput,
  UserPrivateContext,
  UserPublicContext,
} from "./user.types";

type UserPersistedContext = {
  public: UserPublicContext;
  private: Record<string, UserPrivateContext>;
  threadIds: string[];
};

export const userMachine = setup({
  types: {
    context: {} as UserPersistedContext,
    events: {} as UserEvent,
    input: {} as UserInput,
  },
  actions: {
    createMessage: ({ context, event }) => {
      if (
        event.type === "NEW_MESSAGE" &&
        !context.threadIds.includes(event.threadId)
      ) {
        console.log(
          "createMessage",
          event,
          "running SQL on",
          event.storage.sql
        );
        // todo implement storage, soemthing like below
        // event.storage.sql.exec(
        //   `INSERT INTO messages (thread_id, message_id, text) VALUES (${event.threadId}, ${event.messageId}, ${event.text})`
        // );
      }
    },
    maybeCreateThread: ({ context, event }) => {
      console.log("createThread", event);
    },
  },
  guards: {
    isOwner: ({ context, event }) => event.caller.id === context.public.ownerId,
  },
}).createMachine({
  id: "user",
  type: "parallel",
  context: ({ input }: { input: UserInput }) => {
    // Initialize the database
    input.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS messages (
        thread_id TEXT,
        message_id TEXT,
        text TEXT,
        PRIMARY KEY (thread_id, message_id)
      )
    `);
    console.log(" initialized database");
    console.log(" initialized database");
    console.log(" initialized database");
    console.log(" initialized database");
    console.log(" initialized database");
    console.log(" initialized database");
    console.log("Database initialized. Running test inserts...");

    // Test insert 1
    input.storage.sql.exec(
      `INSERT INTO messages (thread_id, message_id, text) VALUES (?, ?, ?)`,
      "test-thread-1",
      "msg1",
      "Hello, world!"
    );
    console.log("Inserted test message 1");

    // Test insert 2
    input.storage.sql.exec(
      `INSERT INTO messages (thread_id, message_id, text) VALUES (?, ?, ?)`,
      "test-thread-1",
      "msg2",
      "SQLite in DO is awesome!"
    );
    console.log("Inserted test message 2");

    console.log("Running test selects...");

    // Test select all
    const allMessages = input.storage.sql
      .exec(`SELECT * FROM messages`)
      .toArray();
    console.log("All messages:", allMessages);

    // Test select for specific thread
    const threadMessages = input.storage.sql
      .exec(`SELECT * FROM messages WHERE thread_id = ?`, "test-thread-1")
      .toArray();
    console.log("Messages in test-thread-1:", threadMessages);

    console.log("Database tests completed");

    return {
      public: {
        ownerId: input.caller.id,
        todos: [],
        lastSync: null,
      },
      private: {
        [input.caller.id]: {
          recentThreadIds: [],
          sessionIds: [],
        },
      },
      threadIds: [],
    };
  },
  states: {
    Initialization: {
      initial: "Ready",
      states: {
        Ready: {},
      },
    },
    Threads: {
      on: {
        NEW_MESSAGE: {
          guard: "isOwner",
          actions: ["createMessage", "maybeCreateThread"],
        },
      },
    },
  },
}) satisfies ActorKitStateMachine<UserEvent, UserInput, UserPersistedContext>;

export type UserMachine = typeof userMachine;
