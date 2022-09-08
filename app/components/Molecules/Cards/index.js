import React, { useEffect, useState } from "react";
import _ from "lodash";
import htmlToFormattedText from "html-to-formatted-text";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import FormItem from "antd/lib/form/FormItem";
import { useMutation } from "@apollo/client";
import { Alert, Button, Col, Dropdown, Form, Menu, message, Row } from "antd";

import {
	CardFormStyle,
	CardGraphicsStyle,
	CardMessageStyle,
	CardMultipleContainerStyle,
	CardPostStyle,
	CardStyle,
	CardTotalBoxStyle,
} from "./style";
import useModal from "../../../hooks/useModal";
import { TitleComponent } from "../../Atoms/Titles";
import { DummyImg } from "../../Atoms/Dummy";
import { ParagraphComponent } from "../../Atoms/Paragraphs";
import { SVGIconVerticalDots, SVGIconWarning } from "../../Atoms/Icons";
import { ButtonComponent } from "../../Atoms/Buttons";
import Wysiwyg from "../../Atoms/Wysiwyg";
import { getFormatDate } from "../../../helpers/getFormatDate";
import { NEW_SOS } from "../../../graphql/sos";
import { getMoneyFormat } from "../../../helpers/formatMoney";
import { WarningModal } from "../../Organisms/Modals";
import { useAppContext } from "../../Context";
import { decodeUTF8Text } from "../../../helpers/decodeUTFText";

export const Card = ({
	isLarge,
	state,
	category,
	createdAt,
	title,
	share,
	description,
	url,
	className,
	symbol,
	active,
	isNotification = false,
	isCut = false,
	isEllipsis = true,
	image = "/static/img/blog-mock.png",
	goTo = null,
	...props
}) => {
	let classNames = ["m-card", className].join(" ");

	const menu = (
		<Menu>
			<Menu.Item>
				<b>COMPARTIR POR:</b>
			</Menu.Item>
			<Menu.Item>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={`mailto:?subject=${title}&body=${description}%0D%0A %0D%0Aingresa a ${process.env.NEXT_PUBLIC_API_URL}/blog/${url} para ver el blog completo.%0D%0A`}
				>
					Correo electrónico
				</a>
			</Menu.Item>
			{/*<Menu.Item>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.antgroup.com"
				>
					Red Social 1
				</a>
			</Menu.Item>
			<Menu.Item>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.antgroup.com"
				>
					Red Social 2
				</a>
			</Menu.Item>*/}
		</Menu>
	);

	const Image = () => {
		return (
			<div className="m-card__img">
				<a>{<img src={image} alt="" />}</a>
			</div>
		);
	};

	const ReadMore = () => {
		return (
			<div className="m-card__read-more">
				<ButtonComponent type="yellowLink" text="Leer más" onClick={goTo} />
			</div>
		);
	};

	const ReadMoreYellow = () => {
		return <ButtonComponent type="yellowLink" text="Leer más" onClick={goTo} />;
	};

	const renderDescription = React.useMemo(() => {
		if (description && isNotification) {
			return (
				<ParagraphComponent
					className="m-card__description"
					style={{ lineHeight: "16px", marginTop: 20 }}
					ellipsis={{
						rows: 3,
						expandable: true,
						symbol: symbol ? symbol : <ReadMoreYellow />,
					}}
				>
					{decodeUTF8Text(htmlToFormattedText(description))}
				</ParagraphComponent>
			);
		}
		if (description && isCut) {
			return (
				<ParagraphComponent className=" m-card__description">
					{" "}
					<Wysiwyg
						html={description}
						className="m-card__content cut__content"
					/>
				</ParagraphComponent>
			);
		}
		if (description && !isCut) {
			return (
				<ParagraphComponent
					className=" m-card__description"
					ellipsis={
						isEllipsis && {
							rows: 2,
							expandable: true,
							symbol: symbol ? symbol : <ReadMoreYellow />,
						}
					}
				>
					{" "}
					<Wysiwyg html={description} className="m-card__content" />
				</ParagraphComponent>
			);
		}
	}, [description, isNotification, isCut, symbol, isEllipsis]);

	return (
		<CardStyle active={active} className={classNames} {...props}>
			{isLarge && <Image />}
			<div className="m-card__header">
				{title && (
					<Row style={{ width: "100%" }}>
						{category && (
							<Col span={24}>
								<ParagraphComponent
									fontSize="12px"
									className="a-paragraph--yellow"
									style={{ marginBottom: 3, textTransform: "uppercase" }}
								>
									{category}
								</ParagraphComponent>
							</Col>
						)}
						<Col span={18}>
							<TitleComponent
								state={state}
								className="a-title--light m-card__title"
								level={5}
							>
								{title}
							</TitleComponent>
						</Col>
						<Col span={6} className="text-white text-right">
							{createdAt && getFormatDate(createdAt)}
						</Col>
					</Row>
				)}
				{share && (
					<Dropdown
						arrow
						overlay={menu}
						trigger={["click"]}
						overlayClassName="share-drop"
					>
						<ButtonComponent
							type="link"
							textAlign="right"
							style={{ padding: "0 0 0 10px" }}
							icon={<SVGIconVerticalDots />}
						/>
					</Dropdown>
				)}
			</div>
			{renderDescription}
			{url && <ReadMore />}
		</CardStyle>
	);
};

export const CardForm = ({
	title,
	children,
	className,
	error,
	cta,
	ctaProps = {},
	loading = false,
	...props
}) => {
	let classNames = ["m-card m-card--form", className].join(" ");

	const CTA = () => {
		return (
			<div className="m-card__cta">
				<ButtonComponent
					text={cta}
					htmlType="submit"
					loading={loading}
					{...ctaProps}
				/>
			</div>
		);
	};

	return (
		<CardFormStyle className={classNames} {...props}>
			{title && (
				<TitleComponent className="a-title--light m-card__title" level={4}>
					{title}
				</TitleComponent>
			)}
			{children}
			{cta && <CTA />}
			{error ? (
				<Alert
					style={{
						marginTop: "20px",
					}}
					message="Error"
					description="Se produjo un error. Inténtalo de nuevo o más tarde"
					type="error"
					showIcon
				/>
			) : null}
		</CardFormStyle>
	);
};

export const CardTotalBox = React.memo(
	({
		title,
		url,
		urlText,
		subTitle,
		options,
		total,
		onOptions,
		positiveValue,
		negativeValue,
		date,
		different,
		isNegativeValue,
		className,
		isCapitalInvertido = false,
		...props
	}) => {
		const now = moment().format("MM-YYYY");
		const { dates } = useAppContext();
		const { isOpen, toggleModal } = useModal();
		const Title = React.useMemo(() => {
			return (
				<p className="m-card__title">
					{title}{" "}
					{url && (
						<ButtonComponent
							className="no-print url-button"
							type="yellowLink"
							text={urlText}
							onClick={onOptions}
						/>
					)}
				</p>
			);
		}, [title, url, urlText, onOptions]);

		const SubTitle = React.useMemo(() => {
			return <p className="m-card__text">{subTitle}</p>;
		}, [subTitle]);

		const Total = React.memo(() => {
			return <p className="m-card__total">{total}</p>;
		}, [total]);

		const PostiveValue = React.useMemo(() => {
			if (typeof positiveValue !== "number") {
				return null;
			}
			return (
				<span className="m-card__positive-value">
					{" "}
					+ {getMoneyFormat(positiveValue, true, true)}
				</span>
			);
		}, [positiveValue]);

		const Alert = () => {
			if (
				!isCapitalInvertido &&
				moment(dates.endAt).format("MM-YYYY") === now
			) {
				return (
					<sup>
						<Button onClick={toggleModal} type="link" className="p-0">
							<SVGIconWarning />
						</Button>
					</sup>
				);
			}
			return null;
		};

		const NegativeValue = React.useMemo(() => {
			return (
				<span className="m-card__negative-value">
					{" "}
					- {getMoneyFormat(`${negativeValue}`.replace("-", ""), true, true)}
					{!isCapitalInvertido &&
					moment(dates.endAt).format("MM-YYYY") === now ? (
						<Alert />
					) : null}
				</span>
			);
		}, [negativeValue, dates, isCapitalInvertido, now, Alert]);

		return (
			<CardTotalBoxStyle
				className={`m-card m-card--total-box ${className}`}
				{...props}
			>
				<div className="m-card__header">
					<div className="m-card__top">
						{title && Title}
						{subTitle && SubTitle}
					</div>
					{options && (
						<Button
							onClick={onOptions}
							type="link"
							icon={<SVGIconVerticalDots />}
						/>
					)}
				</div>
				<div className="m-card__body">
					<Total />
					{different && (
						<span
							className={
								isNegativeValue
									? "m-card__negative-value"
									: "m-card__positive-value"
							}
						>
							{isNegativeValue ? "-" : "+"} {different.replace("-", "")}
							{isNegativeValue && <Alert />}
						</span>
					)}
					{PostiveValue}
					{negativeValue && NegativeValue}
				</div>
				<div className="m-card__footer">
					{date && <span className="m-card__text">{date}</span>}
				</div>
				<WarningModal
					visible={isOpen}
					onCancel={toggleModal}
					text="Tome en cuenta que el mes actual no ha terminado y puede que haya operaciones pendientes de abonar, hasta final de mes."
				/>
			</CardTotalBoxStyle>
		);
	}
);

const TotalCapital = ({ total }) => {
	return (
		<div className="m-card__invested-capital">
			<p className="m-card__label">
				<span className="m-card__label-color" />
				Capital invertido<sup>*</sup>
			</p>
			<p className="m-card__label-value">{getMoneyFormat(total)}</p>
		</div>
	);
};

const TotalRendimiento = ({ total }) => {
	return (
		<div className="m-card__yields">
			<p className="m-card__label">
				<span className="m-card__label-color" />
				Rendimientos<sup>*</sup>
			</p>
			<p className="m-card__label-value">{getMoneyFormat(total)}</p>
		</div>
	);
};

export const CardGraphics = ({
	title,
	totalRendimientos,
	totalCapital,
	isLineGraph,
	children,
	topLabel,
	footerLabel,
	className,
	onShowMore,
	...props
}) => {
	let classNames = ["m-card m-card--graphics", className].join(" ");

	const Title = () => {
		return <p className="m-card__title">{title}</p>;
	};

	const FooterLabel = () => {
		return (
			<div className="m-card__footer">
				<p className="m-card__label">{footerLabel}</p>
			</div>
		);
	};

	return (
		<CardGraphicsStyle className={classNames} {...props}>
			<div className="m-card__header">
				<Title />
				{isLineGraph && (
					<div className="m_card_header">
						<div className="m-card__header-options">
							<TotalCapital total={totalCapital} />
							<TotalRendimiento total={totalRendimientos} />
							<Button
								type="link"
								onClick={onShowMore}
								icon={<SVGIconVerticalDots />}
							/>
						</div>
						<p className="_text">{topLabel}</p>
					</div>
				)}
			</div>
			{children}
			{footerLabel && <FooterLabel />}
		</CardGraphicsStyle>
	);
};

export const CardMultipleContainer = ({ children, ...props }) => {
	return (
		<CardMultipleContainerStyle {...props}>
			{children}
		</CardMultipleContainerStyle>
	);
};

export const CardPost = ({
	title,
	category,
	img,
	content,
	keywords,
	className,
}) => {
	let classNames = ["m-card m-card--post", className].join(" ");

	const Image = () => {
		return (
			<div className="m-card__img">
				<a>
					{img ? (
						<img src={img} className="m-card__image" alt="" />
					) : (
						<DummyImg />
					)}
				</a>
			</div>
		);
	};

	const Keywords = () => {
		return (
			<div className="m-card__keywords">
				{keywords.map(({ text, url }) => {
					return (
						<a
							key={_.uniqueId()}
							href={url ? url : "#"}
							className="m-card__keyword"
						>
							{text}
						</a>
					);
				})}
			</div>
		);
	};

	return (
		<CardPostStyle className={classNames}>
			<Image />
			{category ? <p className="m-card__category">{category}</p> : ""}
			{title ? <p className="m-card__title">{title}</p> : ""}
			{content ? <Wysiwyg html={content} className="m-card__content" /> : ""}
			{keywords && <Keywords />}
		</CardPostStyle>
	);
};

export const CardMessage = ({
	name,
	id,
	className,
	callback,
	textAreaHeight = 142,
	...props
}) => {
	const [form] = Form.useForm();
	const { account } = useAppContext();
	const [createNotification, { loading: loadingNewNoti, error }] =
		useMutation(NEW_SOS);
	const [loading, setLoading] = useState(false);
	let classNames = ["m-card m-card--message", className].join(" ");

	const onFinish = async (values) => {
		setLoading(true);
		try {
			const data = {
				...values,
				cuenta: { connect: { id: account } },
				name: `S.0.S ${name}`,
				user: { connect: { id } },
			};
			await createNotification({ variables: { data } });
			// message.success("Mensaje enviado!");
			if (props.sendCtrl) {
				props.sendCtrl();
			}
			form.resetFields();
		} catch (e) {
			console.log(e);
			message.error(
				e?.response?.data?.message || "No se pudo enviar el mensaje"
			);
		}
		setLoading(false);
		!!callback && callback();
	};

	useEffect(() => {
		if (error) {
			console.log(error);
			message.error("No se pudo enviar el mensaje");
		}
	}, [error]);

	return (
		<CardMessageStyle
			textAreaHeight={textAreaHeight}
			className={classNames}
			{...props}
		>
			<Form form={form} layout="vertical" onFinish={onFinish}>
				<p className="m-card__label">
					<span className="m-card__label-from">De:</span>
					<span className="m-card__label-name">{name}</span>
				</p>
				<FormItem
					required
					name="message"
					label="Mensaje"
					rules={[{ required: true, message: "Por favor inserte un mensaje" }]}
				>
					<TextArea placeholder="Mensaje..." />
				</FormItem>
				<div className="m-card__cta">
					<ButtonComponent
						text="Enviar"
						type="yellow"
						htmlType="submit"
						loading={loading || loadingNewNoti}
					/>
				</div>
			</Form>
		</CardMessageStyle>
	);
};
