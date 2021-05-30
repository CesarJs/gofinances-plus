import React from 'react';
import { Title, TitleProps } from './styles';

interface TitlePropsCh  extends TitleProps{
	children: string;
}

export function TitleComponent({
	children,
	fontSize,
	fontFamily,
	titleColor,
	marginText,
	textAling,
	paddingText,
	bgColor

} : TitlePropsCh){
	return(
		<Title
			fontSize={fontSize}
			fontFamily={fontFamily}
			titleColor={titleColor}
			marginText={marginText}
			textAling={textAling}
			paddingText={paddingText}
			bgColor={bgColor}
		>
			{ children }
		</Title>
	)
}
