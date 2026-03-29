declare module 'koa-body' {
  import type { Middleware } from 'koa';

  interface KoaBodyOptions {
    json?: boolean;
    multipart?: boolean;
    urlencoded?: boolean;
    text?: boolean;
    encoding?: string;
    jsonLimit?: string | number;
    formLimit?: string | number;
    textLimit?: string | number;
  }

  function koaBody(options?: KoaBodyOptions): Middleware;
  export = koaBody;
}

declare module 'koa-helmet' {
  import type { Middleware } from 'koa';

  function helmet(options?: Record<string, unknown>): Middleware;
  export = helmet;
}

declare module 'dotenv' {
  interface DotenvConfigOptions {
    path?: string;
    encoding?: string;
    debug?: boolean;
    override?: boolean;
  }
  interface DotenvConfigOutput {
    parsed?: Record<string, string>;
    error?: Error;
  }
  function config(options?: DotenvConfigOptions): DotenvConfigOutput;
  export { config };
}
