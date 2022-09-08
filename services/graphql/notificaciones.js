const { gql } = require("apollo-server-express");

const NEW_NOTIFICATION = gql`
	mutation NewNotification($data: NotificacionCreateInput){
      createNotificacion(data:$data){
				id
				name
      }
		}
`;
const NEW_NOTIFICATIONS = gql`
	mutation NewNotification($data: [NotificacionsCreateInput]){
      createNotificacions(data:$data){
				id
				name
      }
		}
`;

module.exports = { NEW_NOTIFICATION, NEW_NOTIFICATIONS };
