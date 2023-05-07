// @generated by protoc-gen-es v1.1.1 with parameter "target=ts,import_extension=none"
// @generated from file schemas/v1/todo.proto (package schemas.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * Todo の Body。
 *
 * @generated from message schemas.v1.Todo
 */
export class Todo extends Message<Todo> {
  /**
   * ID。 UUID (v4) で生成すること。
   *
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * Todo の本文。
   *
   * @generated from field: string body = 2;
   */
  body = "";

  /**
   * Todo が Archive されているか。
   *
   * @generated from field: bool archived = 3;
   */
  archived = false;

  constructor(data?: PartialMessage<Todo>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "schemas.v1.Todo";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "body", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "archived", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Todo {
    return new Todo().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Todo {
    return new Todo().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Todo {
    return new Todo().fromJsonString(jsonString, options);
  }

  static equals(a: Todo | PlainMessage<Todo> | undefined, b: Todo | PlainMessage<Todo> | undefined): boolean {
    return proto3.util.equals(Todo, a, b);
  }
}

/**
 * @generated from message schemas.v1.IndexTodoResponse
 */
export class IndexTodoResponse extends Message<IndexTodoResponse> {
  /**
   * Todo の一覧。
   *
   * @generated from field: repeated schemas.v1.Todo todos = 1;
   */
  todos: Todo[] = [];

  constructor(data?: PartialMessage<IndexTodoResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "schemas.v1.IndexTodoResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "todos", kind: "message", T: Todo, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): IndexTodoResponse {
    return new IndexTodoResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): IndexTodoResponse {
    return new IndexTodoResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): IndexTodoResponse {
    return new IndexTodoResponse().fromJsonString(jsonString, options);
  }

  static equals(a: IndexTodoResponse | PlainMessage<IndexTodoResponse> | undefined, b: IndexTodoResponse | PlainMessage<IndexTodoResponse> | undefined): boolean {
    return proto3.util.equals(IndexTodoResponse, a, b);
  }
}

/**
 * @generated from message schemas.v1.CreateTodoRequest
 */
export class CreateTodoRequest extends Message<CreateTodoRequest> {
  /**
   * Todo の本文。
   *
   * @generated from field: string body = 1;
   */
  body = "";

  constructor(data?: PartialMessage<CreateTodoRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "schemas.v1.CreateTodoRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "body", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateTodoRequest {
    return new CreateTodoRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateTodoRequest {
    return new CreateTodoRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateTodoRequest {
    return new CreateTodoRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateTodoRequest | PlainMessage<CreateTodoRequest> | undefined, b: CreateTodoRequest | PlainMessage<CreateTodoRequest> | undefined): boolean {
    return proto3.util.equals(CreateTodoRequest, a, b);
  }
}

/**
 * @generated from message schemas.v1.CreateTodoResponse
 */
export class CreateTodoResponse extends Message<CreateTodoResponse> {
  /**
   * 追加された Todo。
   *
   * @generated from field: schemas.v1.Todo todo = 1;
   */
  todo?: Todo;

  constructor(data?: PartialMessage<CreateTodoResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "schemas.v1.CreateTodoResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "todo", kind: "message", T: Todo },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateTodoResponse {
    return new CreateTodoResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateTodoResponse {
    return new CreateTodoResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateTodoResponse {
    return new CreateTodoResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CreateTodoResponse | PlainMessage<CreateTodoResponse> | undefined, b: CreateTodoResponse | PlainMessage<CreateTodoResponse> | undefined): boolean {
    return proto3.util.equals(CreateTodoResponse, a, b);
  }
}

/**
 * @generated from message schemas.v1.UpdateTodoRequest
 */
export class UpdateTodoRequest extends Message<UpdateTodoRequest> {
  /**
   * 更新する Todo。
   *
   * @generated from field: schemas.v1.Todo todo = 1;
   */
  todo?: Todo;

  constructor(data?: PartialMessage<UpdateTodoRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "schemas.v1.UpdateTodoRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "todo", kind: "message", T: Todo },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateTodoRequest {
    return new UpdateTodoRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateTodoRequest {
    return new UpdateTodoRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateTodoRequest {
    return new UpdateTodoRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateTodoRequest | PlainMessage<UpdateTodoRequest> | undefined, b: UpdateTodoRequest | PlainMessage<UpdateTodoRequest> | undefined): boolean {
    return proto3.util.equals(UpdateTodoRequest, a, b);
  }
}

/**
 * @generated from message schemas.v1.UpdateTodoResponse
 */
export class UpdateTodoResponse extends Message<UpdateTodoResponse> {
  /**
   * 更新された Todo。
   *
   * @generated from field: schemas.v1.Todo todo = 1;
   */
  todo?: Todo;

  constructor(data?: PartialMessage<UpdateTodoResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "schemas.v1.UpdateTodoResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "todo", kind: "message", T: Todo },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateTodoResponse {
    return new UpdateTodoResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateTodoResponse {
    return new UpdateTodoResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateTodoResponse {
    return new UpdateTodoResponse().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateTodoResponse | PlainMessage<UpdateTodoResponse> | undefined, b: UpdateTodoResponse | PlainMessage<UpdateTodoResponse> | undefined): boolean {
    return proto3.util.equals(UpdateTodoResponse, a, b);
  }
}

/**
 * @generated from message schemas.v1.DestroyTodoRequest
 */
export class DestroyTodoRequest extends Message<DestroyTodoRequest> {
  /**
   * ID。 see Todo.id
   *
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<DestroyTodoRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "schemas.v1.DestroyTodoRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DestroyTodoRequest {
    return new DestroyTodoRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DestroyTodoRequest {
    return new DestroyTodoRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DestroyTodoRequest {
    return new DestroyTodoRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DestroyTodoRequest | PlainMessage<DestroyTodoRequest> | undefined, b: DestroyTodoRequest | PlainMessage<DestroyTodoRequest> | undefined): boolean {
    return proto3.util.equals(DestroyTodoRequest, a, b);
  }
}

