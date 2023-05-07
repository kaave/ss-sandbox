import { rest } from 'msw';
import { TodoService } from '../../../gen/schemas/v1/todo_connect';
import type { PickSchemaModel } from '../utils';
import { Todo } from '../../../gen/schemas/v1/todo_pb';

/** Mock 用の簡易 Store。 */
let todos: Todo[] = [
  new Todo({
    id: '8B72FB8D-ABEB-48D7-91CE-6C39F6AD8FC3',
    body: 'Todo 1',
    archived: false,
  }),
  new Todo({
    id: '88D9C115-209A-4524-96C7-578F74292D1F',
    body: 'Todo 2',
    archived: false,
  }),
  new Todo({
    id: '9D3393B0-49A3-476C-B860-AF9E8AF008DA',
    body: 'Todo 3',
    archived: false,
  }),
];

/*
 * Service と同名の変数に mock を定義する。
 */

export const indexTodo = rest.post(
  `http://localhost:3000/${TodoService.typeName}/${TodoService.methods.indexTodo.name}`,
  (_req, res, context) =>
    res(
      context.status(200),
      context.json({ todos } satisfies PickSchemaModel<typeof TodoService.methods.indexTodo.O.prototype>),
    ),
);

export const createTodo = rest.post(
  `http://localhost:3000/${TodoService.typeName}/${TodoService.methods.createTodo.name}`,
  (req, res, context) => {
    // Note: body は deprecated とあるが、代替案として指定されている `req.text()` `req.json()` でまともな値が取得できない。
    const body = req.body as PickSchemaModel<typeof TodoService.methods.createTodo.I.prototype>;
    const newTodo = new Todo({
      id: 'F28AC12B-21BB-4F61-84AA-119BEB2121E8',
      body: body.body,
      archived: false,
    });
    todos = [...todos, newTodo];

    return res(
      context.status(200),
      context.json({ todo: newTodo } satisfies PickSchemaModel<typeof TodoService.methods.createTodo.O.prototype>),
    );
  },
);

export const updateTodo = rest.post(
  `http://localhost:3000/${TodoService.typeName}/${TodoService.methods.updateTodo.name}`,
  (req, res, context) => {
    // Note: body は deprecated とあるが、代替案として指定されている `req.text()` `req.json()` でまともな値が取得できない。
    const { todo: requestTodo } = req.body as PickSchemaModel<typeof TodoService.methods.updateTodo.I.prototype>;
    console.log(requestTodo);
    if (requestTodo === undefined) {
      throw new Error('Invalid request');
    }

    const targetTodo = todos.find(todo => todo.id === requestTodo.id);
    if (targetTodo === undefined) {
      throw new Error('Invalid request');
    }

    targetTodo.body = requestTodo.body;
    targetTodo.archived = requestTodo.archived;

    return res(
      // Respond with a 200 status code
      context.status(200),
      context.json({ todo: new Todo() } satisfies PickSchemaModel<typeof TodoService.methods.updateTodo.O.prototype>),
    );
  },
);

export const destroyTodo = rest.post(
  `http://localhost:3000/${TodoService.typeName}/${TodoService.methods.destroyTodo.name}`,
  (req, res, context) => {
    // Note: body は deprecated とあるが、代替案として指定されている `req.text()` `req.json()` でまともな値が取得できない。
    const body = req.body as PickSchemaModel<typeof TodoService.methods.destroyTodo.I.prototype>;
    todos = todos.filter(todo => todo.id !== body.id);

    return res(
      // Respond with a 200 status code
      context.status(200),
      context.json({} satisfies PickSchemaModel<typeof TodoService.methods.destroyTodo.O.prototype>),
    );
  },
);
