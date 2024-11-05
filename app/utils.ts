import { catchError } from "@jonmumm/utils/catchError";
import type {
  ActorKitEmittedEvent,
  ActorServer,
  AnyActorKitStateMachine,
  Caller,
  CallerSnapshotFrom,
} from "actor-kit";
import { createAccessToken } from "actor-kit/server";
import { applyPatch } from "fast-json-patch";
import { produce } from "immer";
import {
  CallbackLogicFunction,
  EventFrom,
  fromCallback,
  InputFrom,
} from "xstate";
import { invariant } from "./lib/utils";
import type { ActorKitEmitted } from "./user.types";

export function fromActorKit<TMachine extends AnyActorKitStateMachine>(
  actorType: string
) {
  type TReceive = EventFrom<TMachine>;
  type TSendBack = ActorKitEmitted<typeof actorType, TMachine>;
  type TInput = {
    server: DurableObjectNamespace<ActorServer<TMachine>>;
    actorId: string;
    actorInput: Omit<InputFrom<TMachine>, "caller" | "storage" | "env" | "id">;
    caller: Caller;
    signingKey: string;
  };

  const ACTOR_TYPE = actorType
    .split(/(?=[A-Z])/)
    .join("_")
    .toUpperCase();

  const callback: CallbackLogicFunction<TReceive, TSendBack, TInput> = ({
    sendBack,
    receive,
    input,
  }) => {
    const id = input.server.idFromName(input.actorId);
    const stub = input.server.get(id);

    stub
      .spawn({
        actorType,
        actorId: input.actorId,
        caller: input.caller,
        input: input.actorInput,
      })
      .then(async () => {
        const accessToken = await createAccessToken({
          signingKey: input.signingKey,
          actorId: input.actorId,
          actorType,
          callerId: input.caller.id,
          callerType: input.caller.type,
        });

        const connectToWebsocket = stub.fetch(
          new Request(`https://websocket/?accessToken=${accessToken}`, {
            headers: {
              Upgrade: "websocket",
            },
          })
          // input.env as any
        );

        const [err, response] = await catchError(connectToWebsocket);
        if (err) {
          console.error("[NEW_MESSAGE] Error connecting to WebSocket:", err);
          return;
        }

        const websocket = response.webSocket;
        invariant(websocket, "WebSocket is required");

        // We're connecting without a checksum so we'll get back the full snapshot
        // upon connect, but then thereafter get json patches
        let currentSnapshot: CallerSnapshotFrom<TMachine> =
          {} as CallerSnapshotFrom<TMachine>;

        websocket.accept();
        websocket.addEventListener("message", (event) => {
          console.log("[NEW_MESSAGE] WebSocket message:", event.data);

          const data = JSON.parse(
            typeof event.data === "string"
              ? event.data
              : new TextDecoder().decode(event.data)
          ) as ActorKitEmittedEvent;
          currentSnapshot = produce({}, (draft) => {
            applyPatch(draft, data.operations);
          }) as CallerSnapshotFrom<TMachine>;

          sendBack({
            type: `${ACTOR_TYPE}_UPDATED`,
            actorType,
            actorId: input.actorId,
            snapshot: currentSnapshot,
            operations: data.operations,
          });
        });

        websocket.addEventListener("error", (error) => {
          sendBack({
            type: `${ACTOR_TYPE}_ERROR`,
            actorType,
            actorId: input.actorId,
            error: new Error("Not implemented"),
          });
        });

        websocket.addEventListener("close", () =>
          console.log("[NEW_MESSAGE] WebSocket closed")
        );

        // response.webSocket.accept();
        // try {
        //   const response = await stub.fetch(
        //     new Request(`https://thread/?accessToken=${accessToken}`, {
        //       headers: {
        //         Upgrade: "websocket",
        //       },
        //     }),
        //     event.env as any
        //   );
        //   const websocket = response.webSocket;
        //   if (websocket) {
        //     websocket.accept();
        //     // Set up WebSocket event listeners
        //     websocket.addEventListener("open", () =>
        //       console.log("[NEW_MESSAGE] WebSocket opened")
        //     );
        //     websocket.addEventListener("error", (error) =>
        //       console.error("[NEW_MESSAGE] WebSocket error:", error)
        //     );
        //     websocket.addEventListener("close", () =>
        //       console.log("[NEW_MESSAGE] WebSocket closed")
        //     );
        //     // // Send the message
        //     // const eventJson = JSON.stringify({
        //     //   type: "NEW_MESSAGE",
        //     //   content: event.text,
        //     // });
        //     websocket.send(eventJson);
        //   }
        // } catch (error) {
        //   console.error("[NEW_MESSAGE] Error:", error);
        // }
        //
      });

    console.log(sendBack, receive, input);
    receive((event) => {
      console.log("received", event);
    });
  };

  return fromCallback(callback);
}
