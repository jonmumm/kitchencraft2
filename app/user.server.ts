import { createMachineServer } from "actor-kit/worker";
import { userMachine } from "./user.machine";
import {
  UserClientEventSchema,
  UserInputPropsSchema,
  UserServiceEventSchema,
} from "./user.schemas";

export const User = createMachineServer({
  machine: userMachine,
  schemas: {
    clientEvent: UserClientEventSchema,
    serviceEvent: UserServiceEventSchema,
    inputProps: UserInputPropsSchema,
  },
  options: {
    persisted: true,
  },
});

export type UserServer = InstanceType<typeof User>;
export default User;
