import { gql } from "@apollo/client";
import { queryfy } from "./helper";

export const GET_BLOG = (whereObj) => {
	let fieldsBlog = {
		state: "active",
		...whereObj,
	};

	return gql`
    query GetBlog($search: String, $first: Int) {
      allNoticias(
        search: $search,
        where: ${queryfy(fieldsBlog)}
        sortBy: createdAt_DESC,
        first: $first
      ) {
          name
          excerpt
          slug
          category{
            name
          }
          image{
            id
            publicUrl
          }
      }
    }
  `;
};
export const GET_BLOG_V2 = gql`
	query GetBlog(
		$search: String
		$category: String
		$first: Int
		$private: Boolean
		$featured: Boolean
	) {
		allNoticias(
			search: $search
			where: {
				state: "active"
				private: $private
				featured: $featured
				category_some: { slug: $category }
			}
			sortBy: createdAt_DESC
			first: $first
		) {
			name
			excerpt
			slug
			private
			featured
			createdAt
			category {
				name
			}
			image {
				id
				publicUrl
			}
		}
	}
`;

export const GET_CATEGORIES = gql`
	query GetCategories {
		allNoticiaCategorias(where: { state: "active" }, sortBy: name_DESC) {
			name
			slug
			id
		}
	}
`;

export const GET_DESTACADOS = () => {
	let fieldsBlog = {
		state: "active",
		featured: true,
	};

	return gql`
    query GetDestacado {
      allNoticias(
        where: ${queryfy(fieldsBlog)}
        sortBy: createdAt_DESC
      ) {
          createdAt
          name
          excerpt
          slug
          category{
            name
          }
      }
    }
  `;
};

export const GET_NOTAS_RELEVANTES = gql`
	query GetNotasRelevantes(
		$account: ID!
		$fechaGte: String
		$fechaLte: String
	) {
		allNotasRelevantes(
			where: {
				state: "active"
				inversionista: { id: $account }
				fecha_gte: $fechaGte
				fecha_lte: $fechaLte
			}
			sortBy: createdAt_DESC
		) {
			id
			fecha
			descripcion
		}
	}
`;

export const GET_LASTESTS = () => {
	let fieldsBlog = {
		state: "active",
	};

	return gql`
    query GetBlog{
      allNoticias(
        where: ${queryfy(fieldsBlog)}
        sortBy: createdAt_DESC
      ) {
          name
          excerpt
          slug
          category{
            name
          }
      }
    }
  `;
};

export const GET_POST = gql`
	query allNoticias($slug: String) {
		allNoticias: allNoticias(where: { state: "active", slug: $slug }, sortBy: name_DESC) {
			name
			slug
			id
			description
			category {
				id
				name
			}
			temas {
				id
				name
				excerpt
			}
			image {
				id
				publicUrl
			}
		}
		featureBlogs: allNoticias(
			where: {
				state: "active"
				featured: true
			}
			sortBy: createdAt_DESC
			first: 4
		) {
			id
			name
			slug
			createdAt
			category {
				name
			}
			image {
				id
				publicUrl
			}
		}
	}
`;

export const GET_SIMILAR = (whereObj) => {
	let fieldsBlog = {
		state: "active",
		...whereObj,
	};

	return gql`
    query getSimilar {
      allNoticias(
        where: ${queryfy(fieldsBlog)}
        sortBy: createdAt_DESC,
        first: 3
      ) {
          name
          excerpt
          slug
          createdAt
          category{
            name
          }
      }
    }
  `;
};
