import { createRequestHandler } from "@remix-run/server-runtime";
import {
    type ServerBuild,
} from "@remix-run/server-runtime";
import type { ViteRuntime } from 'vite/runtime';

const serverBuildId = "virtual:remix/server-build";

declare const __viteRuntime: ViteRuntime;

const build = await __viteRuntime.executeUrl(serverBuildId) as ServerBuild;

const handler = createRequestHandler(build, "development");

export default {
    async fetch(req: Request, env: Record<string, unknown>, ctx: unknown) {
        let loadContext = {};
        let res = await handler(req, loadContext);
        return res;
    }
}
