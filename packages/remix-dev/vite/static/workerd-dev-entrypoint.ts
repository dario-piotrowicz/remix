import { createRequestHandler } from "@remix-run/server-runtime";
import {
    type ServerBuild,
} from "@remix-run/server-runtime";

// @ts-ignore
const build = await import("virtual:remix/server-build") as ServerBuild;

const remixHandler = createRequestHandler(build, "development");

export default function entrypointHandler(req: Request, env: any, ctx: any): Promise<Response> {
    let loadContext = {
        cloudflare: {
            env,
            cf: (req as any).cf,
            ctx,
            // @ts-ignore
            caches,
        }
    };
    return remixHandler(req, loadContext);
}
