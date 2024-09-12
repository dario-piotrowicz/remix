import { createRequestHandler } from "@remix-run/server-runtime";
import { type ServerBuild } from "@remix-run/server-runtime";

export default async function nodeHandler(req: Request): Promise<Response> {
  // @ts-ignore
  let build = (await import("virtual:remix/server-build")) as ServerBuild;

  let handler = createRequestHandler(build, "development");

  let loadContext = {};
  return handler(req, loadContext);
}
