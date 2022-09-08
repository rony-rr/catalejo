import React, { useState } from "react";
import _ from "lodash";
import moment from "moment";
import { Collapse } from "antd";
import { Hidden, Visible } from "react-grid-system";

import Wysiwyg from "../../Atoms/Wysiwyg";
import { ButtonComponent } from "../../Atoms/Buttons";
import { capitalizeDate } from "../../../helpers/getFormatDate";
import { SVGDummyAccordionImage, SVGIconDownArrow } from "../../Atoms/Icons";
import {
	AccordionDocumentStyle,
	AccordionInvestmentsStyle,
	AccordionPostStyle,
	AccordionTotalsStyle,
	ImgStyle,
} from "./style";

const { Panel } = Collapse;

const defaultFormat = "YYYY-MM-DD";

const sortForDate = (a, b) => {
	return (
		new moment(a.documentDate, defaultFormat).toDate() -
		new moment(b.documentDate, defaultFormat).toDate()
	);
};

export const AccordionDocument = ({ items, className, isColumn, ...props }) => {
	let classNames = ["o-accordion-document", className].join(" ");

	const viewMoreClick = (documentName, fileName, content, documentLink) => {
		// console.log({documentName});
		props.inversionesClick(documentName, fileName, content, documentLink);
	};

	const getItems = () => {
		return items.map(({ folderName, documents }) => {
			return (
				<Panel header={folderName} key={_.uniqueId()}>
					{documents
						.sort(sortForDate)
						.map(
							({
								documentDate,
								documentName,
								documentLink,
								fileName,
								content,
							}) => {
								return (
									<div
										key={_.uniqueId()}
										className={`o-accordion-document__item ${
											isColumn ? "o-accordion-document__item--column" : ""
										} `}
									>
										<div className="o-accordion-document__item-info">
											<span className="o-accordion-document__item-date">
												{capitalizeDate(documentDate)}
											</span>
											<span className="o-accordion-document__item-name">
												{documentName}
											</span>
										</div>
										{isColumn && (
											<ButtonComponent
												className="a-btn--linkYellowBottom"
												text="Leer más"
												onClick={() => {
													if (props.inversionesClick) {
														viewMoreClick(
															documentName,
															fileName,
															content,
															documentLink
														);
													}
												}}
											/>
										)}
										{!isColumn && documentLink !== "#" && (
											<a
												href={documentLink}
												target="_blank"
												rel="noreferrer noopener"
												className="o-accordion-document__item-link"
											>
												Ver documento
											</a>
										)}
									</div>
								);
							}
						)}
				</Panel>
			);
		});
	};

	return (
		<AccordionDocumentStyle
			{...props}
			className={classNames}
			expandIcon={({ isActive }) => (
				<SVGIconDownArrow rotate={isActive ? 90 : 0} />
			)}
		>
			{getItems()}
		</AccordionDocumentStyle>
	);
};

export const AccordionPosts = ({ items, className, ...props }) => {
	let classNames = ["o-accordion-post", className].join(" ");

	const getItems = () => {
		return items.map(({ title, content }) => {
			return (
				<Panel header={title} key={_.uniqueId()}>
					<Wysiwyg html={content} />
				</Panel>
			);
		});
	};
	return (
		<AccordionPostStyle
			{...props}
			className={classNames}
			accordion
			expandIcon={({ isActive }) => (
				<SVGIconDownArrow rotate={isActive ? 90 : 0} />
			)}
		>
			{getItems()}
		</AccordionPostStyle>
	);
};

export const AccordionMenuItems = ({ items, className, ...props }) => {
	let classNames = ["o-accordion-document", className].join(" ");

	const changeSociedadSelected = (newVal) => {
		props.changeSociedadSelected(newVal);
	};

	const getItems = () => {
		// { title_accordion_open, title_accordion_close, items }
		return items.map(({ title_accordion_close, items }) => {
			return (
				<Panel header={title_accordion_close} key={_.uniqueId()}>
					{
						// { _id, cuenta_code, nameItem, valorItem }
						items.map(({ nameItem, valorItem }) => {
							return (
								<div
									key={_.uniqueId()}
									className={`o-accordion-document__item`}
									onClick={() => changeSociedadSelected(valorItem)}
								>
									<div className="o-accordion-document__item-info">
										<span className="o-accordion-document__item-name">
											{nameItem}
										</span>
									</div>
								</div>
							);
						})
					}
				</Panel>
			);
		});
	};

	return (
		<AccordionDocumentStyle
			className={classNames}
			{...props}
			expandIcon={({ isActive }) => (
				<SVGIconDownArrow rotate={isActive ? 90 : 0} />
			)}
		>
			{getItems()}
		</AccordionDocumentStyle>
	);
};

// eslint-disable-next-line react/display-name
export const AccordionTotals = React.memo(({ items, className, ...props }) => {
	const getItems = () => {
		return items.map(({ title, value, content, id }) => {
			return (
				<Panel
					key={id || _.uniqueId()}
					header={
						<p className="o-accordion-totals__header">
							<span className="o-accordion-totals__title">{title}</span>
							<span className="o-accordion-totals__value">{value}</span>
						</p>
					}
				>
					{content}
				</Panel>
			);
		});
	};
	return (
		<AccordionTotalsStyle
			accordion
			className={`o-accordion-totals ${className}`}
			expandIconPosition="right"
			{...props}
		>
			{getItems()}
		</AccordionTotalsStyle>
	);
});

export const AccordionInvestments = ({ items, className, ...props }) => {
	let classNames = ["o-accordion-investment", className].join(" ");

	const getItems = () => {
		return items.map((props) => <ItemAccordion key={props.id} {...props} />);
	};

	return (
		<AccordionInvestmentsStyle {...props} className={classNames}>
			{getItems()}
		</AccordionInvestmentsStyle>
	);
};

const ItemAccordion = ({
	name,
	content,
	description,
	image,
	imgMobile,
	accordion,
}) => {
	const [stateActive, setActiveState] = useState(false);
	const handleAccordion = () => setActiveState(!stateActive);

	const img =
		typeof image === "object"
			? image?.publicUrl
			: `../public/static/img/${image}`;

	const isAccordion = !!accordion.length;

	return (
		<div
			className={`o-accordion-investment__item ${
				stateActive ? "o-accordion-investment__item--active" : ""
			}`}
			key={_.uniqueId()}
		>
			<div className="o-accordion-investment__item-img">
				<div className="wrapper" />
				{isAccordion && stateActive && <div className="wrapper-bottom" />}
				<Hidden xs sm>
					{img ? <ImgStyle img={img} /> : <SVGDummyAccordionImage />}
				</Hidden>
				<Visible xs sm>
					{imgMobile ? (
						<img src={`../public/static/img/${imgMobile}`} alt="" />
					) : img ? (
						<ImgStyle img={img} />
					) : (
						<SVGDummyAccordionImage />
					)}
				</Visible>
			</div>
			{/*Title*/}
			<div className="o-accordion-investment__item-header">{name}</div>
			{isAccordion && !!stateActive && (
				<ButtonComponent
					className="mb-5"
					type="yellowLink"
					text="Leer menos"
					onClick={handleAccordion}
				/>
			)}
			<div
				className={`o-accordion-investment__item-content ${
					isAccordion && stateActive ? "position-absolute" : ""
				}`}
			>
				{!isAccordion ? (
					<Wysiwyg className="opacity-color" html={content || description} />
				) : (
					stateActive && (
						<AccordionPosts
							className={`img-hover ${!stateActive ? "mobile-no-show" : ""}`}
							items={accordion.map((props) => {
								const { id, name, title, description } = props;
								return {
									id,
									title: name || title,
									content: description || content,
								};
							})}
						/>
					)
				)}
			</div>
			<div style={{ width: "100%", textAlign: stateActive ? "right" : "left" }}>
				<ButtonComponent type="yellowLink" onClick={handleAccordion}>
					{stateActive
						? "Cerrar beneficios"
						: isAccordion
						? "Ver beneficios"
						: "Leer más"}
				</ButtonComponent>
				{isAccordion && !stateActive && <div style={{ marginBottom: 65 }} />}
			</div>
		</div>
	);
};
