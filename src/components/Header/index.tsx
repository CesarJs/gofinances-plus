import React from 'react';
import { ButtonHeader } from '../../components/Form/ButtonHeader';
import { Feather } from '@expo/vector-icons';
import {
	Container,
	Title,
	LeftButton,
	RightButton
} from './styles';

interface HeaderProps{
	title: string;
	leftButton?: () => void;
	rightButton?: () => void;
}

export function Header({ title, leftButton, rightButton }: HeaderProps){

	return(
		<Container>
			{leftButton ? <ButtonHeader title="L" onPress={leftButton} ><Feather name="back" color="white" /></ ButtonHeader>: <></>}
			<Title>
				{ title }
			</Title>
			{rightButton ? <ButtonHeader title="R" onPress={rightButton} ><Feather name="shuffle" color="white" /></ButtonHeader> : <></>}
		</Container>
	)
}
