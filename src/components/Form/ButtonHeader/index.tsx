import React, { ReactNode } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface Props extends RectButtonProps {
	children: ReactNode;
	title: string;
	onPress: () => void;
}

export function ButtonHeader({ children, title, onPress, ...rest } : Props){
	return (
		<Container
			onPress={onPress}
			{ ...rest }
		>
			{ children }
			{/* <Title>
				{ title }
			</Title> */}
		</Container>
	)
}
