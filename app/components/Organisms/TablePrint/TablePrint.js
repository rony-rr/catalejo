import { TableStyle, Td, Th, Tr } from "./style";
import React from "react";

export const TablePrint = ({ data, withDate = true }) => {
	return (
		<TableStyle>
			{/*<Tr className="bg-modal-2">
				<Td className="no-border">Inversión</Td>
				{data.map((item, k) => (
					<Td key={k} className="no-border">
						{item.inversion}
					</Td>
				))}
			</Tr>*/}
			{withDate && (
				<Tr className="bg-modal-2">
					<Td className="no-border">Fecha de pago</Td>
					{data.map((item, k) => (
						<Td key={k} className="no-border">
							{item.fecha}
						</Td>
					))}
				</Tr>
			)}
			<Tr>
				<Th className="text-left">Detalle</Th>
				{data.map((item, k) => (
					<Th key={k}>Monto</Th>
				))}
			</Tr>
			<Tr>
				<Td className="text-uppercase line-height">
					Tamaño de la
					<br />
					operation
				</Td>
				{data.map((item, k) => (
					<Td key={k}>{item.tamano}</Td>
				))}
			</Tr>
			<Tr>
				<Td className="text-uppercase line-height">
					Monto
					<br />
					invertido
				</Td>
				{data.map((item, k) => (
					<Td key={k}>{item.monto}</Td>
				))}
			</Tr>
			<Tr>
				<Td className="text-uppercase line-height">
					Proporción
					<br />
					sobre la
					<br />
					operacion
				</Td>
				{data.map((item, k) => (
					<Td key={k}>{item.proporcion}</Td>
				))}
			</Tr>
			<Tr>
				<Td className="text-uppercase line-height">
					Rendimiento
					<br />
					recibido
				</Td>
				{data.map((item, k) => (
					<Td key={k}>{item.recibido}</Td>
				))}
			</Tr>
			<Tr>
				<Td className="text-uppercase line-height">
					Collection
					<br />
					fee
				</Td>
				{data.map((item, k) => (
					<Td key={k}>{item.fee}</Td>
				))}
			</Tr>
			<Tr>
				<Td className="text-uppercase line-height">
					Rendimimento
					<br />
					bruto
				</Td>
				{data.map((item, k) => (
					<Td key={k}>{item.bruto}</Td>
				))}
			</Tr>
			<Tr>
				<Td className="text-uppercase line-height">
					Impuesto
					<br />
					remesa
				</Td>
				{data.map((item, k) => (
					<Td key={k}>{item.impuesto}</Td>
				))}
			</Tr>
			<Tr>
				<Td className="text-uppercase line-height">
					Rendimiento
					<br />
					neto
				</Td>
				{data.map((item, k) => (
					<Td key={k}>{item.neto}</Td>
				))}
			</Tr>
		</TableStyle>
	);
};
