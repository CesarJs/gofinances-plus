import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { HistoryCard } from '../../components/HystoryCard';
import { Header } from '../../components/Header';
import {
	Container,
	LoadContainer,
	Content,
	ChartContainer,
	MouthSelect,
	MounthSelectButton,
	MounthSelectIcon,
	Mounth,
 } from './styles';
// import { categories } from '../../utils/categories';


 export interface TransactionProps {
	type: 'positive' | 'negative';
	name: string;
	amount: string;
	category: string;
	date: string;
}
interface CategoryDataProps {
	percentFormatted: string;
	percent: number;
	name: string;
	total: number;
	totalFormatted: string;
	color: string;
	key: string;
}
export function Resume() {
	const [ isLoading , setIsLoading ] = useState(false);
	const [ typeTransaction , setTypeTransaction ] = useState('negative');
	const [ selectedDate , setSelectedDate] = useState(new Date());
	const [ totalByCategories , setTotalByCategories ] = useState<CategoryDataProps[]>([]);
	const { user, categories, getCategories } = useAuth();
	const theme = useTheme();

	function handleDateChange(action : 'next' | 'previous'){
		setIsLoading(true);
		if(action === 'next'){
			setSelectedDate(addMonths(selectedDate, 1));
		}else{
			setSelectedDate(subMonths(selectedDate, 1));
		}
	}
	function handleChangeTypeTransaction(){
		setTypeTransaction(typeTransaction === 'negative' ? 'positive' : 'negative' );
	}
	async function loadData(){

		const dataKey = `@gofinacen:transacations_user:${user.id}`;
		const response = await AsyncStorage.getItem(dataKey);
		const responseFormatted = response ? JSON.parse(response) : [];


		const expensives = responseFormatted
		.filter((expensive: TransactionProps) =>
		expensive.type === typeTransaction &&
		new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
		new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
		);

		const expensivesTotal = expensives.reduce((accumulator: number, expensive: TransactionProps) => {
			return accumulator + Number(expensive.amount);
		}, 0);

		const totalByCategory: CategoryDataProps[] = [];

		categories.forEach(category => {
			let categorySum = 0;
			expensives.forEach((expensive: TransactionProps) => {
				if(expensive.category === category.key){
					categorySum += Number(expensive.amount);
				}
			});
			if(categorySum > 0){
				const total = categorySum
				.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				});
				const percent = Number((categorySum / expensivesTotal * 100).toFixed(0));
				const percentFormatted = `${percent.toFixed(0)}%`;
				totalByCategory.push({
					key: category.key,
					name: category.name ? category.name : 'erro ao carregar',
					color: category.color? category.color : '#000000',
					total: categorySum,
					totalFormatted: total,
					percent,
					percentFormatted
				});
			}
		});

		setTotalByCategories(totalByCategory);
		setIsLoading(false);
	}
	useEffect(useCallback(() => {
		if(categories.length === 0 ){
			getCategories();
		}
		loadData();
	}, [selectedDate, typeTransaction]));
	return(
		<Container>
			<Header
				title={`Resumo ${typeTransaction === 'negative' ?  ' Sa??das ': ' Entradas'}`}
				rightButton={handleChangeTypeTransaction}
			/>

			{isLoading ?
				<LoadContainer>
					<ActivityIndicator
						color={theme.colors.primary}
						size="large"
					/>
				</LoadContainer> :
					<Content
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingHorizontal: 24,
							paddingBottom: useBottomTabBarHeight(),
						}}
					>
						<MouthSelect>
							<MounthSelectButton onPress={() => handleDateChange('previous')}>
								<MounthSelectIcon name="chevron-left" />
							</MounthSelectButton>
							<Mounth>
								{format(selectedDate, 'MMMM, Y', {locale: ptBR})}
							</Mounth>
							<MounthSelectButton onPress={() => handleDateChange('next')}>
								<MounthSelectIcon name="chevron-right" />
							</MounthSelectButton>
						</MouthSelect>
						<ChartContainer>
							<VictoryPie
								data={totalByCategories}
								x="percentFormatted"
								y="total"
								colorScale={totalByCategories.map(category => category.color)}
								style={{
									labels: {
										fontSize: RFValue(18),
										fontWeight: 'bold',
										fill: theme.colors.shape
									},
								}}
								labelRadius={70}

							/>
						</ChartContainer>
						{
							totalByCategories.map((item) => (
								<HistoryCard
									key={String(item.key)}
									color={item.color}
									amount={item.totalFormatted}
									title={item.name}
								/>
								))
						}
						{totalByCategories.length === 0 && (
							<HistoryCard
							color="#000000"
							amount=" - "
							title="Sem lan??amentos"
						/>
						)}
					</Content>

			}
		</Container>
	)
}
