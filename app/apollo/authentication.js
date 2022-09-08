import React, { createContext, useContext, useState } from "react";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

/**
 * AuthContext
 * -----------
 * This is the base react context instance. It should not be used
 * directly but is exported here to simplify testing.
 */
export const AuthContext = createContext();

/**
 * useAuth
 * -------
 * A hook which provides access to the AuthContext
 */
export const useAuth = () => useContext(AuthContext);

const userFragment = `
  id
  name
  email
  isEnabled
	isAdmin
  cuenta{
    name
    id
  }
  image {
    id
    filename
    publicUrl
  }
  fotoPasaporte {
    id
    filename
    publicUrl
  }
	esExtranjero
`;

const USER_QUERY = gql`
  query {
    authenticatedUser {
      ${userFragment}
    }
  }
`;

const AUTH_MUTATION = gql`
  mutation signin($email: String, $password: String) {
    authenticateUserWithPassword(email: $email, password: $password) {
      item {
        ${userFragment}
      }
    }
  }
`;

const UNAUTH_MUTATION = gql`
  mutation {
    unauthenticateUser {
      success
    }
  }
`;

/**
 * AuthProvider
 * ------------
 * AuthProvider is a component which keeps track of the user's
 * authenticated state and provides methods for managing the auth state.
 */
export const AuthProvider = ({ children, initialUserValue }) => {
	const router = useRouter();
	const [user, setUser] = useState(initialUserValue);
	const [loadInit, setLoadInit] = useState(false);
	const client = useApolloClient();

	const { loading: userLoading } = useQuery(USER_QUERY, {
		fetchPolicy: "no-cache",
		onCompleted: ({ authenticatedUser, error }) => {
			if (error) {
				throw error;
			}

			setLoadInit(true);
			setUser(authenticatedUser)
		},
		onError: console.error
	});

	const [signin, { loading: authLoading }] = useMutation(AUTH_MUTATION, {
		onCompleted: async ({ authenticateUserWithPassword: { item, token } = {}, error }) => {
			if (error) {
				throw error;
			}

			// Ensure there's no old unauthenticated data hanging around
			await client.resetStore();

			if (item) {
				setUser(item);
			}

			if (token) {
				localStorage.setItem('token', token)
			}
		},
		onError: console.error
	});

	const [signout, { loading: unauthLoading }] = useMutation(UNAUTH_MUTATION, {
		onCompleted: async ({ unauthenticateUser: { success } = {}, error }) => {
			if (error) {
				throw error;
			}

			if (success) {
				setUser(null);
				localStorage.clear();
				return router.push("/");
			}
		},
		onError: (err) => {
			console.error(err);
			// Forzar cierre session
			setUser(null);
			localStorage.clear();
			return router.push("/");
		}
	});

	const handleUser = (value) => {
		setUser(prev => {
			return { ...prev, ...value };
		});
	};

	return (
		<AuthContext.Provider
			value={{
				loadInit,
				isAuthenticated: user ? Object.keys(user).length > 0 : false,
				isLoading: userLoading || authLoading || unauthLoading,
				isUserLoading: userLoading,
				signin,
				signout,
				user,
				setLoadInit,
				handleUser
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
