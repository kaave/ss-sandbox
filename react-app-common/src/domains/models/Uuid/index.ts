import { createBrand, type PickBrand } from '../../../lib/utils/Brand';

/** {@link Uuid} を生成する。 version については問わない。 */
export const uuid = createBrand('Uuid', (input: string) => /^[\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12}$/i.test(input));

/** UUID。version については問わない。生成には {@link uuid} を用いること。 */
export type Uuid = PickBrand<typeof uuid>;
