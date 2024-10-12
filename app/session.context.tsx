"use client";

import type { SessionMachine } from "./session.machine";
import { createActorKitContext } from "actor-kit/react";

export const SessionActorKitContext = createActorKitContext<SessionMachine>("session");
export const SessionActorKitProvider = SessionActorKitContext.Provider;
