import * as Hello from './Hello';
import * as Todo from './Todo';

export const handlers = [...Object.values(Hello), ...Object.values(Todo)];
