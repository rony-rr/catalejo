import styled from "styled-components";
import { colors } from "../../../styles/basic/colors";
import { paragraph } from "../../../styles/basic/fonts";

export const CalendarByDayStyle = styled.div`
  &.m-calendar--Simple {
    .nice-dates-navigation {
      background-color: ${colors.yellow};
      color: ${colors.blackBlue} !important;
      font-family: ${paragraph.fontFamily};
      font-size: ${paragraph.fontSize};
      font-weight: ${paragraph.fontWeightButtons};
      line-height: ${paragraph.lineHeight};
      padding: 0 10px;

      .nice-dates-navigation_previous::before,
      .nice-dates-navigation_next::before {
        border-right: none;
        border-top: none;
        transform: none;
        color: #1e3057;
        font-weight: bold;
      }

      .nice-dates-navigation_previous::before {
        content: "〈";
      }

      .nice-dates-navigation_next::before {
        content: "〉";
      }
    }

    .nice-dates-week-header {
      background-color: ${colors.yellow};
      color: ${colors.blackBlue};
      padding: 5px 0;

      .nice-dates-week-header_day {
        color: ${colors.blackBlue};
        margin: 0;
        height: 16px;
        text-align: center;
        font-weight: 600;
        text-transform: uppercase;
        visibility: hidden;

        &:first-letter {
          visibility: visible;
        }
      }
    }

    .nice-dates-grid {
      margin: 0;
      height: 195px !important;
      border: solid 2px ${colors.white};

      .nice-dates-day {
        height: 32px !important;
        color: ${colors.white};
        border-top: 1px solid rgba(238, 242, 244, 0.4);
        border-right: 1px solid rgba(238, 242, 244, 0.4);

        .nice-dates-day_month {
          display: none;
        }

        &::before {
          margin-top: 4px;
          margin-bottom: 4px;
          background: rgba(255, 255, 255, 0.16);
        }

        &.-outside {
          color: ${colors.opacityGray};
          font-weight: 300;
        }

        &.-selected-start::before {
          background: rgba(255, 255, 255, 0.16) !important;
        }

        &.-selected-start:hover,
        &.-selected-middle:hover,
        &.-selected-end:hover {
          color: ${colors.darkBlue};
          background: rgba(255, 255, 255, 0.16) !important;
        }

        &.-selected-end::before {
          background: rgba(255, 255, 255, 0.16) !important;
        }

	      &.-disabled {
		      opacity: 0.4;
	      }
      }
    }

    &.only-month {
      .nice-dates-navigation {
        .nice-dates-navigation_previous,
        .nice-dates-navigation_next {
          visibility: hidden;
        }
      }

      .nice-dates-grid {
        .nice-dates-day {
          &.-outside {
            pointer-events: none;
            cursor: default;
            .nice-dates-day_date {
              pointer-events: none;
              visibility: hidden;
            }
          }
        }
      }
    }
  }
`;

export const CalendarByMonthStyle = styled.div`

  &.m-calendar--Simple {

    padding: 5px;
    min-width: 200px;

    .nice-dates-navigation {
      background-color: ${colors.yellow};
      color: ${colors.blackBlue};
      font-family: ${paragraph.fontFamily};
      font-size: ${paragraph.fontSize};
      font-weight: ${paragraph.fontWeightButtons};
      line-height: ${paragraph.lineHeight};
      padding: 10px;

      .previousYear,
      .nextYear {
        cursor: pointer;
      }

      .previousYear::before,
      .nextYear::before {
        border-right: none;
        border-top: none;
        transform: none;
        color: #1E3057;
        font-weight: bold;
      }

      .previousYear::before {
        content: "〈";
      }

      .nextYear::before {
        content: "〉";
      }

    }

    .nice-dates-grid {
      margin: 5px 0;
      border: solid 2px ${colors.white};
      display: grid;
      grid-template-columns: auto auto auto;
      grid-row-gap: 5px;
      padding: 10px;

    }

  }

`;


export const MonthlyItemComponent = styled.div`
  &.elementMonth--item {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    text-align: center;
    text-transform: uppercase;

    &.middle-date, .start-date, .end-date {
      background-color: rgba(255, 255, 255, .16);
    }

    &.start-date {
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      background-color: rgba(255, 255, 255, .16);
    }

    &.end-date {
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      background-color: rgba(255, 255, 255, .16);
    }

    span {
      color: ${colors.white};
      width: 100%;
      height: 100%;
      background-color: transparent;
      border-radius: 0;
      padding: 3px 0;
			border: solid 2px transparent;

      &.start-date {
        background-color: rgba(255, 255, 255, .4);
        border-radius: 15px;
      }

      &.end-date {
        background-color: rgba(255, 255, 255, .4);
        border-radius: 15px;
      }

			&.disabled {
				opacity: 0.4;
			}

			&:hover {
				border: solid 2px ${colors.gray};
				border-radius: 15px;

				&.disabled {
					border: solid 2px transparent;
					cursor: initial;
				}
			}
    }

    &:nth-child(1) {
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    }

    &:nth-child(4) {
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    }

    &:nth-child(7) {
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    }

    &:nth-child(10) {
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    }

    &:nth-child(3) {
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
    }

    &:nth-child(6) {
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
    }

    &:nth-child(9) {
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
    }

    &:nth-child(12) {
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
    }
  }

`;


export const CalendarByDaySimpleStyle = styled.div`

  &.m-calendar--Simple_day {

    padding: 5px;
    background-color: ${colors.darkBlue};

    .nice-dates-navigation {
      background-color: ${colors.yellow};
      color: ${colors.blackBlue};
      font-family: ${paragraph.fontFamily};
      font-size: ${paragraph.fontSize};
      font-weight: ${paragraph.fontWeightButtons};
      line-height: ${paragraph.lineHeight};
      padding: 10px;

      .nice-dates-navigation_previous::before,
      .nice-dates-navigation_next::before {
        border-right: 2px solid ${colors.blackBlue};
        border-top: 2px solid ${colors.blackBlue};
        // display: none;
      }
    }

    .nice-dates-week-header {
      background-color: ${colors.yellow};
      color: ${colors.blackBlue};
      padding: 5px 10px;

      .nice-dates-week-header_day {
        color: ${colors.blackBlue};
        margin: 0 10px;
        font-weight: 600;
        text-transform: uppercase;
        visibility: hidden;

        &:first-letter {
          visibility: visible;
        }
      }
    }

    .nice-dates-grid {
      margin: 5px 0;
      border: solid 2px ${colors.white};

      .nice-dates-day {

        color: ${colors.white};

        &.-outside {
          color: ${colors.opacityGray};
          font-weight: 300;
        }

        &.-selected-end:hover {
          color: ${colors.darkBlue};
        }

      }
    }

  }

`;
