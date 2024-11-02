import type {
  AnyActorKitStateMachine,
  Caller,
  CallerSnapshotFrom,
} from "actor-kit";
import {
  CallbackLogicFunction,
  EventFrom,
  fromCallback,
  InputFrom,
} from "xstate";
import type { ActorKitEmitted } from "./user.types";

export function fromActorKit<TMachine extends AnyActorKitStateMachine>(
  actorType: string
) {
  type TReceive = EventFrom<TMachine>;
  type TSendBack = ActorKitEmitted<typeof actorType, TMachine>;
  type TInput = {
    actorId: string;
    actorInput: Omit<InputFrom<TMachine>, "caller" | "storage" | "env">;
    caller: Caller;
    signingKey: string;
  };

  const callback: CallbackLogicFunction<TReceive, TSendBack, TInput> = ({
    sendBack,
    receive,
    input,
  }) => {
    console.log(sendBack, receive, input);
    receive((event) => {
      console.log("received", event);
    });

    sendBack({
      type: `${actorType}_INITIALIZED`,
      actorType,
      actorId: input.actorId,
      snapshot: {} as CallerSnapshotFrom<TMachine>,
    });

    sendBack({
      type: `${actorType}_UPDATED`,
      actorType,
      actorId: input.actorId,
      snapshot: {} as CallerSnapshotFrom<TMachine>,
      operations: [],
    });

    sendBack({
      type: `${actorType}_ERROR`,
      actorType,
      actorId: input.actorId,
      error: new Error("Not implemented"),
    });
  };

  return fromCallback(callback);
}
