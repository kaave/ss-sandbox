import { createPromiseClient } from '@bufbuild/connect';
import type { PromiseClient, Transport } from '@bufbuild/connect';
import { createConnectTransport } from '@bufbuild/connect-web';
import { TodoService } from '../../../gen/schemas/v1/todo_connect';
import { useMemo } from 'react';
import { todo, type Todo, type TodoBody, type TodoId } from '../../domains/models/Todo';

type TodoRepositories = {
  /**
   * Todo の一覧を取得する非同期関数。
   *
   * @returns Todo の一覧または Error。
   */
  indexTodo: () => Promise<Error | Todo[]>;
  /**
   * Todo を新規追加する非同期関数。
   *
   * @param body Todo の本文。
   *
   * @returns 追加された Todo または Error。
   */
  createTodo: (body: TodoBody) => Promise<Todo | Error>;
  /**
   * 対象の Todo を更新する。
   *
   * @param updateTodo 更新対象の Todo。
   *
   * @returns 更新後の Todo または Error。
   */
  updateTodo: (updateTodo: Readonly<Todo>) => Promise<Todo | Error>;
  /**
   * 対象の Todo を削除する。
   *
   * @param id 削除対象の Todo の ID。
   */
  destroyTodo: (id: TodoId) => Promise<void>;
};

/**
 * Connect が生成した関数を純粋な関数として変換したものを利用するための Hooks。
 *
 * @param transport {@link createConnectTransport} で生成した {@link Transport}。
 *
 * @returns `TodoService.methods` を純粋な関数として利用できるようにしたもの。
 */
export function useTodoRepositories(transport: Transport): TodoRepositories {
  const todoClient = useMemo(() => createPromiseClient(TodoService, transport), [transport]);

  return useMemo(() => createTodoRepositories(todoClient), [todoClient]);
}

/**
 * Client を元に TodoRepositories を生成する。
 *
 * @param todoClient クライアント
 *
 * @returns リポジトリ
 */
function createTodoRepositories(todoClient: PromiseClient<typeof TodoService>): TodoRepositories {
  return {
    indexTodo: async () => {
      const responseTodos = await todoClient.indexTodo({});
      const todos: Todo[] = [];

      // 一つでも不正な値が混じっていたら Error を返したいので、`Array.map` ではなく `for .. of` を利用する。
      for (const { id, body, archived } of responseTodos.todos) {
        const todoResult = todo({ id, body, archived });

        if (todoResult instanceof Error) {
          return todoResult;
        }

        todos.push(todoResult);
      }

      return todos;
    },
    createTodo: async (body: TodoBody) => {
      const responseTodo = await todoClient.createTodo({ body });

      return responseTodo.todo === undefined
        ? new Error('Failed to create todo')
        : todo({
            id: responseTodo.todo.id,
            body: responseTodo.todo.body,
            archived: responseTodo.todo.archived,
          });
    },
    updateTodo: async (updateTodo: Readonly<Todo>) => {
      const responseTodo = await todoClient.updateTodo({ todo: updateTodo });

      return responseTodo.todo === undefined
        ? new Error('Failed to update todo')
        : todo({
            id: responseTodo.todo.id,
            body: responseTodo.todo.body,
            archived: responseTodo.todo.archived,
          });
    },
    destroyTodo: async (id: TodoId) => {
      await todoClient.destroyTodo({ id });
    },
    // すべての Service を網羅していることを明示的にするために、 satisfies を活用してチェックしている。
  } satisfies Record<keyof typeof TodoService.methods, (...args: unknown[]) => unknown>;
}

/** @deprecated {@link createTodoRepositories} をテストするためのもの。通常利用しないこと。 */
export const createTodoRepositoriesForTest = createTodoRepositories;
