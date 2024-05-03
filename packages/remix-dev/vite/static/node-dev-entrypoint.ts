import { createRequestHandler } from "@remix-run/server-runtime";
import {
    type ServerBuild,
} from "@remix-run/server-runtime";

// @ts-ignore
const build = await import("virtual:remix/server-build") as ServerBuild;

const handler = createRequestHandler(build, "development");

let loadContext = {};

export default function nodeHandler(req: Request): Promise<Response> {
    return handler(req, loadContext);
}
