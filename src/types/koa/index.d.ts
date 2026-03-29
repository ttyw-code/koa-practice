export type Next = () => Promise<void>;
export type Middleware = (ctx: Context, next: Next) => Promise<void> | void;

export interface Request {
  method: string;
  url: string;
  path: string;
  query: Record<string, string | string[]>;
  header: Record<string, string | string[] | undefined>;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  get(field: string): string;
  is(...types: string[]): string | false;
  accepts(...types: string[]): string | string[] | false;
}

export interface Response {
  status: number;
  message: string;
  body: unknown;
  type: string;
  headerSent: boolean;
  set(field: string, value: string | number | string[]): void;
  remove(field: string): void;
  get(field: string): string;
  redirect(url: string, alt?: string): void;
}

export interface Context {
  app: Koa;
  request: Request;
  response: Response;
  state: Record<string, unknown>;
  method: string;
  url: string;
  path: string;
  query: Record<string, string | string[]>;
  headers: Record<string, string | string[] | undefined>;
  body: unknown;
  status: number;
  message: string;
  params: Record<string, string>;
  get(field: string): string;
  set(field: string, value: string | number | string[]): void;
  remove(field: string): void;
  redirect(url: string, alt?: string): void;
  throw(status: number, message?: string): never;
  throw(message: string): never;
  assert(value: unknown, status?: number, message?: string): asserts value;
  is(...types: string[]): string | false;
  accepts(...types: string[]): string | string[] | false;
}

export interface HttpServer {
  close(callback?: (err?: Error) => void): this;
  listen(port?: number, callback?: () => void): this;
  address(): { address: string; family: string; port: number } | string | null;
}

export declare class Koa {
  env: string;
  proxy: boolean;
  middleware: Middleware[];
  subdomainOffset: number;
  silent: boolean;
  keys: string[];

  constructor(options?: {
    env?: string;
    keys?: string[];
    proxy?: boolean;
    subdomainOffset?: number;
    proxyIpHeader?: string;
    maxIpsCount?: number;
  });

  use(middleware: Middleware): this;

  listen(port?: number, callback?: () => void): HttpServer;

  callback(): (req: unknown, res: unknown) => void;

  on(event: 'error', listener: (err: Error, ctx: Context) => void): this;
  on(event: string, listener: (...args: unknown[]) => void): this;
  emit(event: string, ...args: unknown[]): boolean;
}

export default Koa;
