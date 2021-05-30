import React from 'react';
import { useAuth } from '../../hooks/auth';

import {
	Container,
	Title,
	Amount,
	Footer,
	Category,
	Icon,
	CategoryName,
	Date,
} from './styles';

export interface TransactionCardProps {
	type: 'positive' | 'negative';
	name: string;
	amount: string;
	category: string;
	date: string;
}
interface Props {
	data: TransactionCardProps;
}


export function TransactionCard({ data } : Props){
	const { categories, getCategories } = useAuth();
	if(categories.length ===0){
		getCategories();
	}
	const  category   = categories.filter((item) => item.key === data.category)[0];

	return (

		<Container>
			<Title>
				{data.name}
			</Title>
			<Amount type={data.type}>
				{data.type === 'negative' && '- '}
				{data.amount}
			</Amount>
			<Footer>
				<Category>
					<Icon name={category?.icon ? category.icon : 'tv' } />
					<CategoryName>
						{category?.name ? category.name : 'erro ao carregar'}
					</CategoryName>
				</Category>
				<Date>
					{data.date}
				</Date>
			</Footer>
		</Container>
	)
}
