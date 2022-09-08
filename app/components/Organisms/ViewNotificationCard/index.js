import React, { useEffect } from "react";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";

// components
import { SVGIconTrash } from "../../Atoms/Icons";
import { TitleComponent } from "../../Atoms/Titles";
import Wysiwyg from "../../Atoms/Wysiwyg";
import { ParagraphComponent } from "../../Atoms/Paragraphs";

// styles
import { Styles } from "./style";

export const NotificationDeatilCard = ({
	id,
	name,
	message,
	onBack,
	onShowConfirmDelete,
	triggerOpenNotification,
}) => {

	useEffect(() => {
		triggerOpenNotification();
	}, [id])

	return (
		<Styles className="o-notify--detail--card">
			<>
				<div className="content__card--header-icons">
					<div className="return">
						<Button type="link" onClick={onBack}>
							<span>
								<LeftOutlined /> <span className="text">Volver </span>
							</span>
						</Button>
					</div>
					<div className="trash">
						<Button type="link" onClick={onShowConfirmDelete}>
							<span>
								<span className="text">Eliminar</span>
								<SVGIconTrash />
							</span>
						</Button>
					</div>
				</div>
				<TitleComponent className="a-title--light" level={1}>
					{name}
				</TitleComponent>
				<ParagraphComponent className="a-paragraph--light">
					<Wysiwyg html={message} className="m-card__content" />
				</ParagraphComponent>
				<div className="space--div" />
			</>
		</Styles>
	);
};
