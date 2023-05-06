import { rest } from 'msw';
import { HelloWorldService } from '../../../gen/schemas/v1/example_connect';
import { HelloType } from '../../../gen/schemas/v1/example_pb';
import type { PickConnectResponse } from '../utils';

export const sendMessage = rest.post(
  `http://localhost:3000/${HelloWorldService.typeName}/${HelloWorldService.methods.sendMessage.name}`,
  (_req, res, context) =>
    res(
      // Respond with a 200 status code
      context.status(200),
      context.json({} satisfies PickConnectResponse<typeof HelloWorldService.methods.sendMessage.O.prototype>),
    ),
);

export const getMessage = rest.post(
  `http://localhost:3000/${HelloWorldService.typeName}/${HelloWorldService.methods.getMessage.name}`,
  (_req, res, context) =>
    res(
      // Respond with a 200 status code
      context.status(200),
      context.json({
        sentence: 'Hello',
        email: 'mail@add.ress',
        type: HelloType.UNSPECIFIED,
        gotAt: undefined,
      } satisfies PickConnectResponse<typeof HelloWorldService.methods.getMessage.O.prototype>),
    ),
);
