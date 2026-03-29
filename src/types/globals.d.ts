// Minimal global declarations for Node.js built-ins (used when @types/node is unavailable)

declare var process: {
  env: Record<string, string | undefined>;
  exit(code?: number): never;
  cwd(): string;
  argv: string[];
  version: string;
  platform: string;
};

declare module 'path' {
  function resolve(...paths: string[]): string;
  function join(...paths: string[]): string;
  function dirname(path: string): string;
  function basename(path: string, ext?: string): string;
  function extname(path: string): string;
  const sep: string;
  const delimiter: string;
  export { resolve, join, dirname, basename, extname, sep, delimiter };
  export default { resolve, join, dirname, basename, extname, sep, delimiter };
}

declare module 'url' {
  function fileURLToPath(url: string | URL): string;
  function pathToFileURL(path: string): URL;
  export { fileURLToPath, pathToFileURL };
}

declare module 'http' {
  import type { EventEmitter } from 'events';
  interface IncomingMessage extends EventEmitter {
    method?: string;
    url?: string;
    headers: Record<string, string | string[]>;
  }
  interface ServerResponse {
    statusCode: number;
    setHeader(name: string, value: string | number | string[]): this;
    end(data?: string | Buffer): this;
    write(chunk: string | Buffer): boolean;
  }
  interface Server extends EventEmitter {
    listen(port: number, callback?: () => void): this;
    close(callback?: () => void): this;
  }
  function createServer(
    requestListener?: (req: IncomingMessage, res: ServerResponse) => void,
  ): Server;
  export { IncomingMessage, ServerResponse, Server, createServer };
  export default { createServer };
}

declare module 'events' {
  class EventEmitter {
    on(event: string, listener: (...args: unknown[]) => void): this;
    off(event: string, listener: (...args: unknown[]) => void): this;
    emit(event: string, ...args: unknown[]): boolean;
    once(event: string, listener: (...args: unknown[]) => void): this;
    removeListener(event: string, listener: (...args: unknown[]) => void): this;
    removeAllListeners(event?: string): this;
  }
  export { EventEmitter };
  export default EventEmitter;
}

declare namespace NodeJS {
  interface EventEmitter {
    on(event: string, listener: (...args: unknown[]) => void): this;
    off(event: string, listener: (...args: unknown[]) => void): this;
    emit(event: string, ...args: unknown[]): boolean;
    once(event: string, listener: (...args: unknown[]) => void): this;
    removeListener(event: string, listener: (...args: unknown[]) => void): this;
    removeAllListeners(event?: string): this;
  }
  interface ReadWriteStream extends EventEmitter {
    readable: boolean;
    writable: boolean;
    read(size?: number): string | Buffer;
    write(buffer: string | Buffer): boolean;
    end(cb?: () => void): this;
    pipe<T extends NodeJS.WritableStream>(destination: T): T;
  }
  interface WritableStream extends EventEmitter {
    write(buffer: string | Buffer): boolean;
    end(cb?: () => void): this;
  }
}

declare module 'mongoose' {
  type ObjectId = { toString(): string };

  interface SchemaDefinition {
    [key: string]: SchemaTypeOptions | SchemaDefinition;
  }

  interface SchemaTypeOptions {
    type?: unknown;
    required?: boolean;
    trim?: boolean;
    lowercase?: boolean;
    default?: unknown;
    unique?: boolean;
    enum?: unknown[];
    min?: number;
    max?: number;
    ref?: string;
  }

  interface SchemaOptions {
    timestamps?: boolean;
    versionKey?: boolean;
  }

  interface Document {
    _id: ObjectId;
    id: string;
    save(): Promise<this>;
    toObject<T = Record<string, unknown>>(): T;
    toJSON<T = Record<string, unknown>>(): T;
  }

  class Schema<T = unknown> {
    constructor(definition?: SchemaDefinition, options?: SchemaOptions);
    add(obj: SchemaDefinition): void;
    index(obj: Record<string, number | string>): this;
    pre(method: string, fn: () => void): void;
    post(method: string, fn: () => void): void;
  }

  interface QueryResult<T> {
    exec(): Promise<T>;
    lean(): QueryResult<T extends Document ? Omit<T, keyof Document> & { _id: ObjectId } : T>;
    sort(arg: Record<string, 1 | -1 | 'asc' | 'desc'>): this;
    limit(n: number): this;
    skip(n: number): this;
    select(fields: string | Record<string, 0 | 1>): this;
    populate(path: string): this;
    then<TResult1 = T>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    ): Promise<TResult1>;
  }

  interface Model<T extends Document> {
    new (data?: Partial<T>): T;
    find(filter?: Record<string, unknown>): QueryResult<T[]>;
    findById(id: string | ObjectId): QueryResult<T | null>;
    findOne(filter?: Record<string, unknown>): QueryResult<T | null>;
    findByIdAndUpdate(
      id: string | ObjectId,
      update: Record<string, unknown>,
      options?: Record<string, unknown>,
    ): QueryResult<T | null>;
    findByIdAndDelete(id: string | ObjectId): QueryResult<T | null>;
    create(data: Partial<Omit<T, keyof Document>>): Promise<T>;
    deleteOne(filter?: Record<string, unknown>): Promise<{ deletedCount: number }>;
    deleteMany(filter?: Record<string, unknown>): Promise<{ deletedCount: number }>;
    countDocuments(filter?: Record<string, unknown>): QueryResult<number>;
  }

  function model<T extends Document>(name: string, schema?: Schema): Model<T>;
  function connect(uri: string, options?: Record<string, unknown>): Promise<typeof mongoose>;
  function disconnect(): Promise<void>;

  const connection: {
    on(event: string, listener: (...args: unknown[]) => void): void;
    readyState: number;
  };

  const mongoose: typeof import('mongoose');
  export {
    Schema,
    Document,
    Model,
    ObjectId,
    model,
    connect,
    disconnect,
    connection,
  };
  export default mongoose;
}
