import React, { useEffect, useState } from "react";
import { Empty, message, Skeleton } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import _ from "lodash";

import {
	GET_NOTIFICACIONS,
	UPDATE_NOTIFICACION,
} from "../../../graphql/notificacion";
import { useAppContext } from "../../Context";
import useModal from "../../../hooks/useModal";
import notificationsUtils from "../../../../utils/notification";

import Error from "../../../pages/_error";
import { TitleComponent } from "../../Atoms/Titles";
import { ParagraphComponent } from "../../Atoms/Paragraphs";
import { HorizontalTabs } from "../../Organisms/HorizontalTabs";
import { ConfirmModal, SuccessModal } from "../../Organisms/Modals";
import { Card, CardMultipleContainer } from "../../Molecules/Cards";
import { NotificationDeatilCard } from "../../Organisms/ViewNotificationCard";

import {
	StyleColTabs,
	StyleContainer,
	StyleContent,
	StyleDetails,
	StyleRow,
	StyleSpin,
	StyleWrapper,
} from "./style";

const TemplateNotificaciones = () => {
	const { account } = useAppContext();
	const [type, settype] = useState(notificationsUtils.type[0]);
	const [currentNotify, setCurrentNotify] = useState(null);
	const { isOpen: deleteOpen, toggleModal: toggleDelete } = useModal();
	const [successModal, setSuccessModal] = useState(false);

	// QUERIES
	const { data, loading, error } = useQuery(GET_NOTIFICACIONS, {
		skip: !account,
		fetchPolicy: "cache-and-network",
		variables: {
			account,
			type: type,
		},
	});

	// MUTATIONS
	const [updateNotification, { loading: loadingDelNotification }] = useMutation(
		UPDATE_NOTIFICACION,
		{
			// Then re-run
			refetchQueries: [
				{
					query: GET_NOTIFICACIONS,
					variables: {
						account,
						type: type,
					},
				},
			],
		}
	);

	// tranformamos los datos
	const notificaciones = React.useMemo(() => {
		if (data?.allNotificacions) {
			const newData = [];
			data.allNotificacions.map((f) => {
				const logStatus = JSON.parse(f.logStatus || "[]");
				const find = logStatus.find((l) => l.cuenta === account);
				// no retorna las notificaciones archivadas
				if (find.status !== notificationsUtils.state[2]) {
					newData.push({
						...f,
						logStatus,
						isRead: find.status === notificationsUtils.state[1],
					});
				}
			});
			return newData;
		}
		return [];
	}, [data, account]);

	// confirmar eliminacion
	const onDeleteNotification = async () => {
		try {
			// find status
			const _logStatus = currentNotify?.logStatus?.map((l) => {
				if (l.cuenta === account) {
					return { ...l, status: notificationsUtils.state[2] };
				}
				return l;
			});

			await updateNotification({
				variables: {
					ID: currentNotify?.id,
					logStatus: JSON.stringify(_logStatus),
				},
			});
			setSuccessModal(true);
			setCurrentNotify(null);
		} catch (e) {
			message.error("No se pudo eliminar la notificación");
		}
		toggleDelete();
	};

	// trigger cuando se abre la notificacion
	const triggerOpenNotification = async () => {
		try {
			// find status
			const _logStatus = currentNotify?.logStatus?.map((l) => {
				if (l.cuenta === account) {
					return { ...l, status: notificationsUtils.state[1] };
				}
				return l;
			});

			await updateNotification({
				variables: {
					ID: currentNotify?.id,
					logStatus: JSON.stringify(_logStatus),
				},
			});
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
		}
	};

	const renderNotifications = React.useMemo(() => {
		if (loading && !notificaciones.length) {
			return <StyleSpin />;
		}
		if (error) {
			return <Error message={error} />;
		}
		if (!notificaciones?.length && !loading) {
			return <Empty description={`No hay ${type} nuevos`} />;
		}

		return null;
	}, [loading, error, notificaciones, type]);

	const getStateCard = React.useCallback(
		(current, item) => {
			const find = current?.logStatus?.find((a) => a.cuenta === account);
			return find && item.id === current?.id;
		},
		[account]
	);

	useEffect(() => {
		setCurrentNotify(null);
	}, [account]);

	if (!account) {
		return <Skeleton className="skeleton" active />;
	}

	return (
		<StyleWrapper>
			<StyleContent>
				<TitleComponent className="a-title--light--thin" level={2}>
					Notificaciones
				</TitleComponent>
				<ParagraphComponent className="a-paragraph--light">
					de los últimos 3 meses
				</ParagraphComponent>
				<StyleContainer>
					<StyleRow>
						<StyleColTabs className={currentNotify ? "open-tab " : ""}>
							<HorizontalTabs
								onChange={(key) => settype(key)}
								items={notificationsUtils.type.map((title) => ({
									title,
									key: title,
									content: "",
								}))}
							/>
							<CardMultipleContainer className="container--cards">
								{/* loading */}
								{renderNotifications}
								{notificaciones.map((item) => {
									const active = getStateCard(currentNotify, item);
									return (
										<Card
											title={item.name}
											url={undefined}
											share={false}
											state={!item.isRead}
											active={active}
											isNotification
											key={_.uniqueId()}
											description={item.message}
											className="m-card--small"
											onClick={() =>
												setCurrentNotify({
													...item,
													logStatus: item.logStatus,
												})
											}
										/>
									);
								})}
							</CardMultipleContainer>
						</StyleColTabs>
						{currentNotify && (
							<StyleDetails className={currentNotify ? "open-details" : ""}>
								<NotificationDeatilCard
									id={currentNotify.id}
									name={currentNotify.name}
									message={currentNotify.message}
									logState={currentNotify.logState}
									onShowConfirmDelete={toggleDelete}
									onBack={() => setCurrentNotify(null)}
									triggerOpenNotification={triggerOpenNotification}
								/>
							</StyleDetails>
						)}
					</StyleRow>
				</StyleContainer>
				<ConfirmModal
					okText="Eliminar"
					visible={deleteOpen}
					loading={loadingDelNotification}
					onConfirmChangePass={onDeleteNotification}
					onChangeConfirmModal={toggleDelete}
					text={
						<TitleComponent level={5} className="a-title--light--thin">
							¿Seguro quiere eliminar esta <br /> notificación?
						</TitleComponent>
					}
				/>
			</StyleContent>
			<SuccessModal
				title
				visible={successModal}
				text="Notificación eliminada"
				onCancel={() => setSuccessModal(!successModal)}
			/>
		</StyleWrapper>
	);
};

export default TemplateNotificaciones;
