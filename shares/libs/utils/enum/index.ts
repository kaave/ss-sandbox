/**
 * Enum から String Literal Types を生成する。
 *
 * @template Enum 対象の Enum。
 *
 * @example
 *
 * ```ts
 * enum UserType {
 *   UNSPECIFIED = 0,
 *   MEMBER = 1,
 *   ADMIN = 2,
 * }
 * type UserTypeStringLiteral = KeyOfEnum<typeof UserType>
 * //   ^? 'UNSPECIFIED' | 'MEMBER' | 'ADMIN'
 * ```
 */
export type KeyOfEnum<Enum> = Extract<keyof Enum, string>;

/**
 * 引数の Enum から、 String Literal Types を元の Enum に変換する Converter を生成する。
 *
 * @param enumObject 対象の Enum。
 *
 * @returns Converter。
 *
 * @example
 * ```ts
 * enum UserType {
 *   UNSPECIFIED = 0,
 *   MEMBER = 1,
 *   ADMIN = 2,
 * }
 *
 * const convertToUserType = enumConverterFactory(UserType);
 * const userType = convertToUserType('UNSPECIFIED');
 * //    ^? UserType.UNSPECIFIED
 * ```
 */
export function enumConverterFactory<Enum extends Record<string, unknown>>(
  enumObject: Enum,
): <Key extends Extract<keyof Enum, string>>(key: Key) => Enum[Key] {
  return key => enumObject[key];
}

