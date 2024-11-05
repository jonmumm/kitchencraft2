import type { ActorKitStateMachine, ActorServer, Caller } from "actor-kit";
import { produce } from "immer";
import { v7 as uuidv7 } from "uuid";
import { ActorRefFrom, assign, sendTo, setup } from "xstate";
import { z } from "zod";
import { invariant } from "./lib/utils";
import {
  MessageSchema,
  UserEmailSchema,
  UserProfileSchema,
  UserSchema,
} from "./schemas";
import { ThreadMachine } from "./thread.machine";
import type {
  ExtractType,
  InsertMessage,
  InsertUserEmail,
  InsertUserProfile,
  Message,
  User,
  UserEmail,
  UserProfile,
} from "./types";
import sqlSchema from "./user.tables.sql";
import {
  type UserEvent,
  type UserInput,
  type UserPrivateContext,
  type UserPublicContext,
} from "./user.types";
import { fromActorKit } from "./utils";

export const MessageInputSchema = z.object({
  id: z.string(),
  thread_id: z.string(),
  content: z.string(),
  role: z.enum(["user", "assistant"]),
  type: z.enum(["text", "recipe", "image", "file"]),
  created_at: z.string().optional(),
});

export type MessageInput = z.infer<typeof MessageInputSchema>;

export const MessagesArraySchema = z.array(MessageInputSchema);

export type MessagesArray = z.infer<typeof MessagesArraySchema>;

const threadActor = fromActorKit<ThreadMachine>("thread");

type UserServerContext = {
  public: UserPublicContext;
  private: Record<string, UserPrivateContext>;
  children: {
    thread: Partial<Record<string, ActorRefFrom<typeof threadActor>>>;
  };
};

function initializeTables(storage: DurableObjectStorage): void {
  storage.sql.exec(sqlSchema);
}

/**
 * Gets the next message position for a thread.
 * @param storage - The Durable Object storage instance.
 * @param threadId - The ID of the thread.
 * @returns The next position number.
 */
function getNextMessagePosition(
  storage: DurableObjectStorage,
  threadId: string
): number {
  const rawResult = storage.sql
    .exec(
      `SELECT COALESCE(MAX(position), 0) + 1 AS next_position FROM thread_messages WHERE thread_id = ?`,
      threadId
    )
    .toArray();

  try {
    const result = SqlResultSchema.parse(rawResult);
    return result[0].next_position;
  } catch (error) {
    console.warn("Failed to parse SQL result:", error);
    return 1;
  }
}

/**
 * Action to insert a new message when a NEW_MESSAGE event is received.
 * @param context - The current context of the state machine.
 * @param event - The event that triggered this action.
 */
// function insertUserMessage({ event }: { event: UserEvent }): void {
//   if (event.type === "NEW_MESSAGE") {
//     const d1 = event.env.DB as D1Database;
//     console.log("inserting message", event);

//     // const storage = event.storage;
//     // const threadId = event.threadId;

//     // Check if the thread exists
//     // const threadExists =
//     //   storage.sql.exec(`SELECT 1 FROM threads WHERE id = ?`, threadId).toArray()
//     //     .length > 0;

//     // // If the thread doesn't exist, create it
//     // if (!threadExists) {
//     //   createThread(storage, { id: threadId });
//     // }

//     // createMessage(storage, threadId, {
//     //   content: event.text,
//     //   role: "user",
//     //   type: "text", // Assuming all user messages are of type "text"
//     // });
//   }
// }

/**
 * Action to create a new thread when a CREATE_THREAD event is received.
 * @param context - The current context of the state machine.
 * @param event - The event that triggered this action.
 */

// Define a schema for the SQL result
const SqlResultSchema = z
  .array(
    z.object({
      next_position: z
        .union([
          z.number(),
          z.string().transform((val) => parseInt(val, 10)),
          z.instanceof(ArrayBuffer).transform((buf) => new Int32Array(buf)[0]),
        ])
        .transform((val) => (isNaN(val) ? 1 : val)),
    })
  )
  .min(1);

// New schemas for database operations
const ThreadSchema = z.object({
  id: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

const CreateThreadInput = z.object({
  id: z.string().optional(),
});

/**
 * Creates a new thread in the database.
 * @param storage - The Durable Object storage instance.
 * @param input - The input for creating a new thread.
 * @returns The created thread object.
 */
function createThread(
  storage: DurableObjectStorage,
  input: z.infer<typeof CreateThreadInput>
) {
  const id = input.id || uuidv7();
  const now = new Date().toISOString();
  try {
    storage.sql.exec(
      `INSERT INTO threads (id, created_at, updated_at) VALUES (?, ?, ?)`,
      id,
      now,
      now
    );
    const threadData = { id, created_at: now, updated_at: now };
    console.log("Thread data before parsing:", threadData);
    const parsedThread = ThreadSchema.safeParse(threadData);
    if (!parsedThread.success) {
      console.error("Zod parsing error:", parsedThread.error);
      throw new Error("Failed to parse thread data");
    }
    return parsedThread.data;
  } catch (error) {
    console.error("Error creating thread:", error);
    console.error("Thread ID:", id);
    console.error("Input:", input);
    throw error;
  }
}

/**
 * Creates a new message in the database.
 * @param storage - The Durable Object storage instance.
 * @param threadId - The ID of the thread to which the message belongs.
 * @param input - The input for creating a new message.
 * @returns The created message object.
 */
// function createMessage(
//   storage: DurableObjectStorage,
//   threadId: string,
//   input: z.infer<typeof CreateMessageInput>
// ) {
//   const id = uuidv7();
//   const now = new Date().toISOString();
//   try {
//     storage.sql.exec(
//       `INSERT INTO messages (id, content, role, type, created_at) VALUES (?, ?, ?, ?, ?)`,
//       id,
//       input.content,
//       input.role,
//       input.type,
//       now
//     );
//     const position = getNextMessagePosition(storage, threadId);
//     storage.sql.exec(
//       `INSERT INTO thread_messages (thread_id, message_id, position, created_at) VALUES (?, ?, ?, ?)`,
//       threadId,
//       id,
//       position,
//       now
//     );
//     const messageData = {
//       id,
//       thread_id: threadId,
//       content: input.content,
//       role: input.role,
//       type: input.type,
//       created_at: now,
//     };
//     console.log("Message data before parsing:", messageData);
//     const parsedMessage = MessageInputSchema.safeParse(messageData);
//     if (!parsedMessage.success) {
//       console.error("Zod parsing error:", parsedMessage.error);
//       throw new Error("Failed to parse message data");
//     }
//     return parsedMessage.data;
//   } catch (error) {
//     console.error("Error creating message:", error);
//     console.error("Thread ID:", threadId);
//     console.error("Input:", input);
//     throw error;
//   }
// }

// const fromActorServer = <TMachine extends AnyActorKitStateMachine>({
//   server,
//   signingKey,
//   actorId,
//   actorType,
//   caller,
// }: {
//   server: DurableObjectNamespace<ActorServer<TMachine>>;
//   signingKey: string;
//   actorId: string;
//   actorType: string;
//   caller: Caller;
// }): CallbackLogicFunction<
//   EventFrom<TMachine>,
//   TEmitted<typeof actorType, TMachine>,
//   InputFrom<TMachine>
// > => {
//   return fromCallback(({ receive, input, sendBack }) => {
//     receive(async (event) => {
//       if (event.type === "NEW_MESSAGE") {
//         const id = server.idFromName(actorId);
//         const stub = server.get(id);
//         // Spawn the thread actor
//         await stub.spawn({
//           actorType,
//           actorId,
//           caller,
//           input: {},
//         });
//         // Create access token
//         const accessToken = await createAccessToken({
//           signingKey,
//           actorId,
//           actorType,
//           callerId: caller.id,
//           callerType: caller.type,
//         });
//         try {
//           const response = await stub.fetch(
//             new Request(`https://thread/?accessToken=${accessToken}`, {
//               headers: {
//                 Upgrade: "websocket",
//               },
//             }),
//             event.env as any
//           );
//           const websocket = response.webSocket;
//           if (websocket) {
//             websocket.accept();
//             // Set up WebSocket event listeners
//             websocket.addEventListener("open", () =>
//               console.log("[NEW_MESSAGE] WebSocket opened")
//             );
//             websocket.addEventListener("error", (error) =>
//               console.error("[NEW_MESSAGE] WebSocket error:", error)
//             );
//             websocket.addEventListener("close", () =>
//               console.log("[NEW_MESSAGE] WebSocket closed")
//             );
//             // // Send the message
//             // const eventJson = JSON.stringify({
//             //   type: "NEW_MESSAGE",
//             //   content: event.text,
//             // });
//             websocket.send(eventJson);
//           }
//         } catch (error) {
//           console.error("[NEW_MESSAGE] Error:", error);
//         }
//       }
//     });

//     // Cleanup function
//     return () => {
//       console.log("Cleaning up actor server connection");
//     };
//   });
// };

export const userMachine = setup({
  types: {
    context: {} as UserServerContext,
    events: {} as UserEvent,
    input: {} as UserInput,
  },
  actors: {
    thread: fromActorKit<ThreadMachine>("thread"),
  },
  actions: {
    // sendMessageToThread: (
    //   _,
    //   params: {
    //     threadId: string;
    //     messageId: string;
    //     text: string;
    //   }
    // ) => {
    //   console.log("sendMessageToThread", params);
    // },
    spawnThread: assign(
      (
        { context, spawn },

        {
          server,
          threadId,
          caller,
          signingKey,
        }: {
          server: DurableObjectNamespace<ActorServer<ThreadMachine>>;
          caller: Caller;
          threadId: string;
          signingKey: string;
        }
      ) => {
        const actorId = `thread-${threadId}` as const;

        const ref = spawn("thread", {
          id: actorId,
          input: {
            server: server,
            actorId: threadId,
            actorInput: {
              id: threadId,
            },
            caller,
            signingKey,
          },
        });
        return produce(context, (draft) => {
          draft.children.thread[actorId] = ref;
        });
      }
    ),
  },
  guards: {
    threadNotRunning: ({ context }, params: { threadId: string }) => {
      return !context.children.thread[params.threadId];
    },
  },
}).createMachine({
  id: "user",
  type: "parallel",
  context: ({ input }: { input: UserInput }) => {
    console.log("initializing context", input);
    // initializeTables(input.storage);

    return {
      public: {
        ownerId: input.caller.id,
        threads: {},
        lastSync: null,
      },
      private: {
        [input.caller.id]: {
          recentThreadIds: [],
          sessionIds: [],
          activeThreads: {},
        },
      },
      children: {
        thread: {},
      },
    };
  },
  states: {
    Initialization: {
      initial: "Ready",
      states: {
        Ready: {},
      },
    },
    Row: {
      initial: "Uninitialized",
      states: {
        Uninitialized: {
          always: {
            target: "Initializing",
            guard: ({ event }: { event: UserEvent }) => !!event.env,
          },
        },
        Initializing: {},
        Created: {},
      },
    },

    Threads: {
      initial: "Idle",
      on: {
        NEW_MESSAGE: [
          {
            guard: {
              type: "threadNotRunning",
              params: ({
                event,
              }: {
                event: ExtractType<UserEvent, "NEW_MESSAGE">;
              }) => ({ threadId: event.threadId }),
            },
            actions: {
              type: "spawnThread",
              params: ({
                event,
              }: {
                event: ExtractType<UserEvent, "NEW_MESSAGE">;
              }) => ({
                threadId: event.threadId,
                caller: event.caller,
                server: event.env.THREAD,
                signingKey:
                  (invariant(event.env, "env is required"),
                  event.env.ACTOR_KIT_SECRET),
              }),
            },
          },
          {
            actions: sendTo<
              UserServerContext,
              ExtractType<UserEvent, "NEW_MESSAGE">,
              any,
              NonNullable<UserServerContext["children"]["thread"][string]>,
              any
            >(
              ({
                context,
                event,
              }: {
                context: UserServerContext;
                event: ExtractType<UserEvent, "NEW_MESSAGE">;
              }) => {
                const thread = context.children.thread[event.threadId];
                invariant(thread, "thread not found");
                invariant(event.caller, "caller is required");
                return thread;
              },
              ({ event }) => ({
                type: "NEW_MESSAGE",
                content: event.text,
                caller: { type: "service" as const, id: event.caller.id },
                storage: event.storage,
                env: event.env,
              })
            ),
          },
        ],
        THREAD_INITIALIZED: {
          actions: console.log,
        },
        THREAD_ERROR: {
          actions: console.error,
        },
        THREAD_UPDATED: {
          actions: ({
            event,
          }: {
            event: ExtractType<UserEvent, "THREAD_UPDATED">;
          }) => {
            console.log("THREAD_UPDATED", event.snapshot);
          },
        },
      },
      states: {
        Idle: {},
      },
    },
  },
}) satisfies ActorKitStateMachine<UserEvent, UserInput, UserServerContext>;

export type UserMachine = typeof userMachine;

async function createMessage(
  db: D1Database,
  message: InsertMessage
): Promise<Message> {
  const now = new Date().toISOString();

  await db
    .prepare(
      `
      INSERT INTO messages (
        id, user_id, parent_id, content, role, type, intent_type, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `
    )
    .bind(
      message.id,
      message.user_id,
      message.parent_id,
      message.content,
      message.role,
      message.type,
      message.intent_type,
      now
    )
    .run();

  const result = await db
    .prepare("SELECT * FROM messages WHERE id = ?")
    .bind(message.id)
    .first();

  if (!result) {
    throw new Error("Failed to create message");
  }

  return MessageSchema.parse(result);
}

// Helper to get user by ID
async function getUser(db: D1Database, id: string): Promise<User | null> {
  const result = await db
    .prepare("SELECT * FROM users WHERE id = ?")
    .bind(id)
    .first();

  return result ? UserSchema.parse(result) : null;
}

// Helper to get user by email
async function getUserByEmail(
  db: D1Database,
  email: string
): Promise<User | null> {
  const result = await db
    .prepare(
      `
      SELECT u.* 
      FROM users u
      JOIN user_emails ue ON u.id = ue.user_id
      WHERE ue.email = ?
    `
    )
    .bind(email)
    .first();

  return result ? UserSchema.parse(result) : null;
}

async function createUserEmail(
  db: D1Database,
  input: InsertUserEmail
): Promise<UserEmail> {
  const now = new Date().toISOString();

  await db
    .prepare(
      `INSERT INTO user_emails (user_id, email, verified, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?)`
    )
    .bind(input.user_id, input.email, input.verified, now, now)
    .run();

  const result = await db
    .prepare("SELECT * FROM user_emails WHERE user_id = ?")
    .bind(input.user_id)
    .first();

  if (!result) {
    throw new Error("Failed to create user email");
  }

  return UserEmailSchema.parse(result);
}

async function createUserProfile(
  db: D1Database,
  input: InsertUserProfile
): Promise<UserProfile> {
  const now = new Date().toISOString();

  await db
    .prepare(
      `INSERT INTO user_profiles (
        user_id, display_name, full_name, bio, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?)`
    )
    .bind(
      input.user_id,
      input.display_name,
      input.full_name,
      input.bio,
      now,
      now
    )
    .run();

  const result = await db
    .prepare("SELECT * FROM user_profiles WHERE user_id = ?")
    .bind(input.user_id)
    .first();

  if (!result) {
    throw new Error("Failed to create user profile");
  }

  return UserProfileSchema.parse(result);
}
