import { gql } from "@apollo/client";

export const REQUEST_CHANGE_PASSWORD = gql`
  mutation requestChangePass($email: String) {
    createRestorePassword(
      data: {
        email: $email
      }
    ) {
      id
    }
  }
`;

export const VERIFY_CODE_RECOVER = gql`
	query verifyCode($code: String!) {
		allRestorePasswords(where: { code: $code, state: "activate" }) {
			id
			code
			user
			createdAt
		}
	}
`;
