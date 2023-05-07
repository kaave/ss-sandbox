import { enumConverterFactory } from ".";

describe('Enum', () => {
  describe('enumConverterFactory', () => {
    it('入力に対し、対応した Enum を返却する。', () => {
      enum UserType {
        UNSPECIFIED = 0,
        MEMBER = 1,
        ADMIN = 2,
      }

      const convertToUserType = enumConverterFactory(UserType);

      expect(convertToUserType('UNSPECIFIED')).toEqual(UserType.UNSPECIFIED);
      expect(convertToUserType('MEMBER')).toEqual(UserType.MEMBER);
      expect(convertToUserType('ADMIN')).toEqual(UserType.ADMIN);
    });
  });
});
