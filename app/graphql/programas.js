import {gql} from '@apollo/client';

export const GET_PROGRAMS = gql`
    query GetPrograms($account: ID!) {
      allProgramas(where: { cuenta_some: { id: $account } }) {
				name,
				description,
				image {
					publicUrl
				}
				accordion(sortBy: order_ASC) {
					id
					name
					description
					order
				}
      }
    }`;
