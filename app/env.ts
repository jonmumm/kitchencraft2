import type { ActorServer } from "actor-kit";
import type { Remix } from "../server";
import { ThreadServer } from "./thread.server";
import type { UserServer } from "./user.server";

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    env: Env;
    userId: string;
    sessionId: string;
    pageSessionId: string;
  }
}

export interface Env {
  REMIX: DurableObjectNamespace<Remix>;
  USER: DurableObjectNamespace<UserServer>;
  THREAD: DurableObjectNamespace<ThreadServer>;
  SESSION_JWT_SECRET: string;
  ACTOR_KIT_SECRET: string;
  ACTOR_KIT_HOST: string;
  NODE_ENV: string;
  [key: string]: DurableObjectNamespace<ActorServer<any>> | unknown;
}
