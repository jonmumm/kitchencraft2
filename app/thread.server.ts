import { createMachineServer } from "actor-kit/worker";
import { threadMachine } from "./thread.machine";
import {
  ThreadClientEventSchema,
  ThreadInputPropsSchema,
  ThreadServiceEventSchema,
} from "./thread.schemas";

export const Thread = createMachineServer({
  machine: threadMachine,
  schemas: {
    clientEvent: ThreadClientEventSchema,
    serviceEvent: ThreadServiceEventSchema,
    inputProps: ThreadInputPropsSchema,
  },
  options: {
    persisted: true,
  },
});

export type ThreadServer = InstanceType<typeof Thread>;
export default Thread;
