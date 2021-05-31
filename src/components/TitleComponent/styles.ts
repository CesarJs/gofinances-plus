import { RFValue } from 'react-native-responsive-fontsize';
import styled , { css } from 'styled-components/native';

import theme from '../../global/styles/theme';




export interface TitleProps{
	fontSize: number;
	fontFamily: 'regular' | 'medium' | 'bold';
	titleColor: 'primary' | 'secondary' | 'secondary_linght' | 'success' | 'seccess_light' | 'attention' | 'attention_light' | 'shape' | 'title' | 'text' | 'text_dark' | 'backgorund';
	bgColor?: 	'primary' | 'secondary' | 'secondary_linght' | 'success' | 'seccess_light' | 'attention' | 'attention_light' | 'shape' | 'title' | 'text' | 'text_dark' | 'backgorund';
	marginText?: {
		horizontal?: number;
		vertical?: number;
		top?: number;
		bottom?: number;
		left?: number;
		right?: number;
	};
	paddingText?: {
		horizontal?: number;
		vertical?: number;
		top?: number;
		bottom?: number;
		left?: number;
		right?: number;
	};
	textAling?: 'center' | 'left' | 'right';
}


export const Title = styled.Text<TitleProps>`

	text-align: ${({ textAling }) => textAling ? textAling : 'left'};
	font-size: ${({ fontSize }) => RFValue(fontSize) }px;
	color: ${({ titleColor }) => theme.colors[titleColor]};
	font-family: ${({ fontFamily }) => theme.fonts[fontFamily]};

	background-color: ${({ bgColor }) => bgColor ? theme.colors[bgColor] : 'transparent'};

	padding: ${({ paddingText }) =>
	 `${paddingText?.horizontal ? paddingText?.horizontal : 0}px;
	  ${paddingText?.vertical ? paddingText?.vertical: 0}px;`};

	margin: ${({ marginText }) =>
	 `${marginText?.horizontal ? marginText?.horizontal : 0}px;
	  ${marginText?.vertical ? marginText?.vertical: 0}px;`}


	${({ marginText }) => marginText?.top && css`
		margin-top: ${marginText?.top}px;
	`}

	${({ marginText }) => marginText?.bottom && css`
		margin-top: ${marginText?.bottom}px;
	`}

	${({ marginText }) => marginText?.left && css`
		margin-top: ${marginText?.left}px;
	`}

	${({ marginText }) => marginText?.right && css`
		margin-top: ${marginText?.right}px;
	`}

	${({ paddingText }) => paddingText?.top && css`
		padding-top: ${paddingText?.top}px;
	`}

	${({ paddingText }) => paddingText?.bottom && css`
		padding-top: ${paddingText?.bottom}px;
	`}

	${({ paddingText }) => paddingText?.left && css`
		padding-top: ${paddingText?.left}px;
	`}

	${({ paddingText }) => paddingText?.right && css`
		padding-top: ${paddingText?.right}px;
	`}



`;
