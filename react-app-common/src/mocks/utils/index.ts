import { type Message } from '@bufbuild/protobuf';

/**
 * Connect で生成されたコードの Request / Response の Prototype から、値のみを抽出する。
 *
 * @remarks
 * もっとよいやり方、または Utility types が存在すると思われる。要調査。
 *
 * @example
 *
 * ```proto3
 * // schema example
 *
 * message HelloWorldResponse {
 *   string message = 1;
 * }
 *
 * service HelloWorldService {
 *   rpc hello(google.protobuf.Empty) returns (HelloWorldResponse) {}
 * }
 * ```
 *
 * ```ts
 * // TypeScript example
 *
 * PickSchemaModel<typeof HelloWorldService.methods.hello.O.prototype>;
 * // => { message: string }
 * ```
 *
 * @template ResponsePrototype - 対象。
 */
export type PickSchemaModel<ResponsePrototype extends Message> = {
  [Key in Exclude<keyof ResponsePrototype, keyof Message>]: ResponsePrototype[Key];
};

// import { Empty, type AnyMessage, type Message, MethodKind } from "@bufbuild/protobuf";

// type Service = {
//   typeName: string;
//   methods: Record<string, {
//     name: string;
//     I: AnyMessage; // AnyMessage
//     O: AnyMessage; // AnyMessage
//     kind: MethodKind;
//   }>,
// };

// const a = {
//   typeName: '',
//   methods: {
//     a: {
//       name: 'a',
//       I: new Empty(),
//       O: new Empty(),
//       kind: MethodKind.Unary,
//     },
//     b: {
//       name: 'b',
//       I: new Empty(),
//       O: new Empty(),
//       kind: MethodKind.Unary,
//     }
//   },
// } satisfies Service;

// type A = typeof a;
// type Test = keyof A['methods'];

// /**
//  * Service と Method から URL を生成する。
//  *
//  * @param service - Connect によって Protobuf から生成されたなんらかのサービス。
//  * @param method - {@link service} に含まれるメソッドの key。
//  * @returns 生成された URL。
//  */
// export function createUrl<T extends Service, ServiceKey extends keyof T['methods']>(service: T, method: ServiceKey): string {
//   return `http://localhost:3000/${service.typeName}/${service.methods[method]?.name}`;
// }
