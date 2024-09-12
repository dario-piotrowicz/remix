import { createRequestHandler } from "@remix-run/server-runtime";
import { type ServerBuild } from "@remix-run/server-runtime";

export default {
  async fetch(req: Request, env: any, ctx: any): Promise<Response> {
    // @ts-ignore
    let build = (await import("virtual:remix/server-build")) as ServerBuild;

    let remixHandler = createRequestHandler(build, "development");

    let loadContext = {
      cloudflare: {
        env,
        cf: (req as any).cf,
        ctx,
        // @ts-ignore
        caches,
      },
    };
    return remixHandler(req, loadContext);
  },
};
