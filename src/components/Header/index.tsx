import React, { ComponentType } from 'react';
import { ButtonHeader } from '../../components/Form/ButtonHeader';
import { Feather } from '@expo/vector-icons';
import {
	Container,
	Title,
	EmptyComponenet
} from './styles';

interface HeaderProps{
	title: string;
	leftButton?: () => void;
	rightButton?: () => void;

}

export function Header({ title, leftButton, rightButton }: HeaderProps){

	return(
		<Container>
			{leftButton ?
				<ButtonHeader onPress={leftButton} >
					 <Feather name="x-circle" color="white" size={20} />
				</ ButtonHeader>
			: <EmptyComponenet />
			}
			<Title>
				{ title }
			</Title>
			{rightButton ?
				<ButtonHeader onPress={rightButton} >
					<Feather name="shuffle" color="white" size={20} />
				</ButtonHeader>
			: <EmptyComponenet />
			}
		</Container>
	)
}
