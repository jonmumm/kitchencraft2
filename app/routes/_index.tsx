import type { MetaFunction } from "@remix-run/cloudflare";
import { SessionActorKitContext } from "~/session.context";

export const meta: MetaFunction = () => {
  return [{ title: "KitchenCraft" }];
};

export default function Homepage() {
  const userId = SessionActorKitContext.useSelector(
    (state) => state.public.ownerId
  );
  return (
    <div>
      <div>Hello KitchenCraft</div>
      <div>{userId}</div>
    </div>
  );
}
