import { gql } from "@apollo/client";

export const NEW_NOTIFICATION = gql`
    mutation NewNotification($data: NotificacionCreateInput){
      createNotificacion(data:$data){
				id
				name
      }
		}
`;

export const GET_NOTIFICACIONS = gql`
    query GetNotificacions($account: ID!, $type: String!){
      allNotificacions(where: {
				state: "active",
				type: $type,
				cuenta_some: {
          id: $account
        }
			}){
				id
				name
				state
				type
				createdAt
				message
				logStatus
      }
}`;


export const GET_NOTIFICACION = gql`
    query GetNotificacion($ID: ID!){
      Notificacion(where: {
					id: $ID
			}){
				id
				name
				state
				type
				message
				createdAt
      }
}`;


export const UPDATE_NOTIFICACION = gql`
  mutation UpdateNotificacion(
    $ID: ID!,
		$logStatus: String!,
  ) {
    updateNotificacion(
      id: $ID,
      data: {
        logStatus: $logStatus,
      }
    ) {
      id
    }
  }
`;
