import { type Plugin } from "vite";
// import { join } from "path";

// import { fromNodeRequest, toNodeRequest } from "./node-adapter";

const NAME = "vite-plugin-remix-cloudflare-proxy";

let readyResolve: () => void;
const ready = new Promise<void>(resolve => readyResolve = resolve);

export const cloudflareDevProxyVitePlugin = (): Plugin => {
  return {
    name: NAME,
    // @ts-ignore
    ready,
    config: () => ({
      ssr: {
        resolve: {
          externalConditions: ["workerd", "worker"],
        },
      },
    }),
    configResolved: (viteConfig) => {
      let pluginIndex = (name: string) =>
        viteConfig.plugins.findIndex((plugin) => plugin.name === name);
      let remixIndex = pluginIndex("remix");
      if (remixIndex >= 0 && remixIndex < pluginIndex(NAME)) {
        throw new Error(
          `The "${NAME}" plugin should be placed before the Remix plugin in your Vite config file`
        );
      }
    },
    configureServer: async (viteDevServer) => {
      return async () => {
        // let ssrRuntime = await (viteDevServer.ssrRuntime$);

        // let requestDispatcher = await ssrRuntime.createRequestDispatcher({
        //   entrypoint: join(__dirname, 'static', 'cloudflare-dev-entrypoint.ts'),
        // });

        readyResolve();

        // if (!viteDevServer.config.server.middlewareMode) {
        //   viteDevServer.middlewares.use(async (nodeReq, nodeRes, next) => {
        //     try {
        //       let req = fromNodeRequest(nodeReq);
        //       let res = await requestDispatcher(req);
        //       await toNodeRequest(res, nodeRes);
        //     } catch (error) {
        //       next(error);
        //     }
        //   });
        // }
      };
    },
  };
};

declare module 'vite' {
  interface ViteDevServer {
    /**
     * Note: ssrRuntime needs to be promise-based because in the plugin's `configureServer`
     *       we need to wait until the Vite dev server Http server is ready in order to get
     *       its address and pass it to the alternative runtime
     */
    ssrRuntime$: Promise<SSRRuntime>;
  }
}

export type SSRRuntime = {
  createRequestDispatcher: CreateRequestDispatcher;
};

export type CreateRequestDispatcher = (
  options: CreateRequestDispatcherOptions,
) => Promise<DispatchRequest>;

export type CreateRequestDispatcherOptions = {
  entrypoint: string;
};

export type DispatchRequest = (req: Request) => Response | Promise<Response>;
