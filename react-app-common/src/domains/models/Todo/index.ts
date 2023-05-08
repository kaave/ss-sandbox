import { createBrand, type PickBrand } from '../../../lib/utils/Brand';
import { uuid } from '../Uuid';

/** {@link TodoId} を生成する。 */
export const todoId = createBrand('TodoId', (input: string) => !(uuid(input) instanceof Error));

/** Todo の ID。 生成には {@link todoId} を利用する。 */
export type TodoId = PickBrand<typeof todoId>;

/** {@link TodoBody} を生成する。 */
export const todoBody = createBrand('TodoBody', (input: string) => input.length <= 120);
/** Todo の Body。 生成には {@link todoBody} を利用する。 */
export type TodoBody = PickBrand<typeof todoBody>;

/**
 * Todo を生成する。
 *
 * @param args 生成元となる引数。
 *
 * @returns Todo。ただし {@link args} が不正な値の場合は Error を返す。
 */
export function todo(args: { id: string; body: string; archived: boolean }): Todo | Error {
  const id = todoId(args.id);
  const body = todoBody(args.body);

  if (id instanceof Error || body instanceof Error) {
    return new Error('Invalid todo');
  }

  return {
    id,
    body,
    archived: args.archived,
  };
}

/** Todo。 */
export type Todo = {
  /** ID。 */
  id: TodoId;
  /** Body。 */
  body: TodoBody;
  /** Archive されているか。 `true` で Archive 済を表す。 */
  archived: boolean;
};
