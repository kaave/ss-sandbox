// Brand型ファクトリー
type Brand<Name extends string, Type extends string | number = string> = Type & {
  readonly __brand: Name;
};

/**
 * Brand型を生成するファクトリー。
 *
 * @param name Brand名。
 * @param validator 入力値を検証する関数。
 *
 * @returns Factory 関数。
 */
export function createBrand<Name extends string, Input extends string | number = string>(
  name: Name,
  validator: (input: Input) => boolean,
): (input: Input) => Brand<Name, Input> | Error {
  return (input: Input) =>
    validator(input) ? (input as Brand<Name, Input>) : new Error(`\`${input}\` is not valid ${name}`);
}

/** Brand型を生成するファクトリー。 */
export type PickBrand<
  Source extends
    | ((input: string) => Error | Brand<string, string>)
    | ((input: number) => Error | Brand<string, number>),
> = Exclude<ReturnType<Source>, Error>;
