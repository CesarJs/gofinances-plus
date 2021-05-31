import React from 'react';

import {
	Container,
	Title,
} from './styles';

export interface TransactionCardProps {
	type: 'positive' | 'negative';
	name: string;
	amount: string;
	category: string;
	date: string;
}
interface Props {
	navigation?: string;
}


export function ListEmpty({ navigation } : Props){

	return (

		<Container>
			<Title>
				Sem lançamentos ainda
			</Title>
		</Container>
	)
}
