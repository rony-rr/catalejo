import { gql } from "@apollo/client";

export const NEW_SOS = gql`
    mutation NewSOs($data: AyudaCreateInput){
      createAyuda(data:$data){
				id
				name
      }
		}
`;
