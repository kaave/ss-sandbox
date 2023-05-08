import { createPromiseClient, type Transport } from '@bufbuild/connect';
import { createConnectTransport } from '@bufbuild/connect-web';
import { TodoService } from '../../../gen/schemas/v1/todo_connect';
import { useCallback, useMemo } from 'react';
import { todo, type Todo, type TodoBody, type TodoId } from '../../domains/models/Todo';

/**
 * Todo の一覧を取得する関数を作成する。
 *
 * @param transport {@link createConnectTransport} で生成した {@link Transport}。
 *
 * @returns Todo の一覧を取得する非同期関数。
 */
export async function useIndexTodo(transport: Transport): Promise<{ indexTodo: () => Promise<Todo[] | Error> }> {
  const todoClient = useMemo(() => createPromiseClient(TodoService, transport), [transport]);

  return {
    indexTodo: useCallback(async () => {
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
    }, [todoClient]),
  };
}

/**
 * Todo を生成する関数を作成する。
 *
 * @param transport {@link createConnectTransport} で生成した {@link Transport}。
 *
 * @returns Todo の一覧を取得する非同期関数。
 */
export async function useCreateTodo(
  transport: Transport,
): Promise<{ createTodo: (body: TodoBody) => Promise<Todo | Error> }> {
  const todoClient = useMemo(() => createPromiseClient(TodoService, transport), [transport]);

  return {
    createTodo: useCallback(
      async (body: TodoBody) => {
        const responseTodo = await todoClient.createTodo({ body });

        return responseTodo.todo === undefined
          ? new Error('Failed to create todo')
          : todo({
              id: responseTodo.todo.id,
              body: responseTodo.todo.body,
              archived: responseTodo.todo.archived,
            });
      },
      [todoClient],
    ),
  };
}

/**
 * Todo を更新する関数を作成する。
 *
 * @param transport {@link createConnectTransport} で生成した {@link Transport}。
 *
 * @returns Todo を更新する非同期関数。
 */
export async function useUpdateTodo(
  transport: Transport,
): Promise<{ updateTodo: (updateTodo: Readonly<Todo>) => Promise<Todo | Error> }> {
  const todoClient = useMemo(() => createPromiseClient(TodoService, transport), [transport]);

  return {
    updateTodo: useCallback(
      async (updateTodo: Readonly<Todo>) => {
        const responseTodo = await todoClient.updateTodo({ todo: updateTodo });

        return responseTodo.todo === undefined
          ? new Error('Failed to update todo')
          : todo({
              id: responseTodo.todo.id,
              body: responseTodo.todo.body,
              archived: responseTodo.todo.archived,
            });
      },
      [todoClient],
    ),
  };
}

/**
 * Todo を削除する関数を作成する。
 *
 * @param transport {@link createConnectTransport} で生成した {@link Transport}。
 *
 * @returns Todo を削除する非同期関数。
 */
export async function useDestroyTodo(transport: Transport): Promise<{ destroyTodo: (id: TodoId) => Promise<void> }> {
  const todoClient = useMemo(() => createPromiseClient(TodoService, transport), [transport]);

  return {
    destroyTodo: useCallback(
      async (id: TodoId) => {
        await todoClient.destroyTodo({ id });
      },
      [todoClient],
    ),
  };
}
