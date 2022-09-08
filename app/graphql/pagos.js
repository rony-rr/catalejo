import { gql } from '@apollo/client';

export const UPLOAD_PAGOS = gql`
    mutation UploadPagos($data: [PagosCreateInput]){
        createPagos(data:$data){
            id
        }
	}
`;

