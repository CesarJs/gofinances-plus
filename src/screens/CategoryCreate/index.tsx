import React, {useEffect, useState} from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';

import { Button } from '../../components/Form/Button';
import { useAuth } from '../../hooks/auth';

import { categories } from '../../utils/categories';
import { colors_categorias } from '../../utils/colors_categorias';
import { iocns_default } from '../../utils/icons';



import {
	Container,
	Header,
	Title,
	Category,
	IconSelect,
	Footer,
	ColorsSelect,
	Color,
	Separator,
	BoxResetData,
	IconDelete

} from './styles';
import { InputForm } from '../../components/Form/InputForm';
import { Fields, Form, TransactionTypes } from '../Register/styles';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import theme from '../../global/styles/theme';


interface FormData{
	name: string;
}

export interface Category {
	key: string;
	name: string;
	type: string;
}

interface Props {
	category: Category;
	handleClose: () => void;
	getDataFromStorage: () => void;
}
const schema = Yup.object().shape({
	name: Yup
	.string()
	.required('Nome é obrigatório!')
});

export function CategoryCreate({
	handleClose,
	getDataFromStorage
} : Props) {
	const [ transactionType, setTransacionType] = useState('');
	const [ color, setColor] = useState('#000000');
	const [ icon, setIcon ] = useState('gift');
	const [ categoriesData, setCategoriesData ] = useState<Category[]>([] as Category[]);
	const { user } = useAuth();
	const dataKey = `@gofinacen:transacations_type:${user.id}`;

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		resolver: yupResolver(schema)
	});
	async function getDataFromStorageCreate(key: string){
		try {
			const dataStorage =  await AsyncStorage.getItem(key);
			if(dataStorage){
				const data_ = JSON.parse(dataStorage) as Category[];
				setCategoriesData(data_);
			}else{
				setDataFromStorage(key, categories);
				setCategoriesData(categories);
			}
		} catch (error) {
			throw new Error(error);

		}

	}
	async function setDataFromStorage(key: string, data: Category[]){
		try {
			const dataSave = JSON.stringify(data);
			await AsyncStorage.setItem(key, dataSave);
		} catch (error) {
			throw new Error(error);

		}
	}
	function handleTransactionTypeSelect(type: 'positive' | 'negative'){

		setTransacionType(type === transactionType ? '' : type);
	}
	function resetForm() {
		setTransacionType('');
		reset();
	}
	async function handleRegister(form: FormData){
		if(!transactionType){
			return Alert.alert('Selecione o tipo da transação !');
		}

		const key = form.name.replace(/\s/g, '').toLowerCase();

		const verify = categoriesData.filter((item) =>  item.key === key );

		if(verify.length > 0){
			Alert.alert("Já existe essa categoria");
			return false;
		}
		const newData = {
			key,
			name: form.name,
			icon,
			color,
			type: transactionType
		}

		try {

			const data = await AsyncStorage.getItem(dataKey);
			const currentData = data ? JSON.parse(data) : [];
			const dataFormatted = [

				...currentData,
				newData
			];

			await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

			resetForm();
			handleClose();
			getDataFromStorage();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível salvar');
		}
	}
	async function resetCategories() {
		Alert.alert(
			"Restaura dados",
			"Você tem certeza que deseja restaurar os dados de categoria ?",
			[
                {
                    text: 'Cancelar',
                    onPress: () => false,
                    style: 'cancel',
                },
                {
					text: 'OK', onPress: () => {},
					style: 'destructive'
				},
            ]
		);
		await AsyncStorage.removeItem(dataKey);
		getDataFromStorageCreate(dataKey);
		getDataFromStorage();
	}
	useEffect(() => {
		getDataFromStorageCreate(dataKey);

	}, []);
	useEffect(() => {

	}, [categoriesData]);
	return (
		<Container>
			<Header>
				<BoxResetData>
					<IconDelete
						onPress={handleClose}
						isActive={true}
						bgColor={theme.colors.primary}
					>
						<Feather name="x-circle" color={theme.colors.shape} size={20} />

					</IconDelete>
					<Title>Adicionando Categoria</Title>
					<IconDelete
						onPress={resetCategories}
						isActive={true}
						bgColor={theme.colors.attention_light}
					>
						<Feather name="trash" color={theme.colors.attention} size={20} />

					</IconDelete>
				</BoxResetData>
			</Header>
			<Form>
				<Fields>
					<InputForm
						name="name"
						control={control}
						placeholder="Nome"
						autoCapitalize="sentences"
						autoCorrect={false}
						error={errors.name && errors.name.message}
						/>
					<ColorsSelect>
						<FlatList
							data={iocns_default}
							style={{flex: 1, width: '100%'}}
							keyExtractor={(item) => item.icon}
							showsHorizontalScrollIndicator={false}
							horizontal
							renderItem={({ item }) => {
								return (
									<IconSelect
										onPress={() => setIcon(item.icon)}
										isActive={icon === item.icon}
										bgColor="#333"
									>
									 <Feather name={item.icon} color="black" size={25} style={{height: 25}}/>

									</IconSelect>
								)
							}}
							ItemSeparatorComponent={() => <Separator />}


						/>
					</ColorsSelect>
					<ColorsSelect>
						<FlatList
							data={colors_categorias}
							style={{flex: 1, width: '100%'}}
							keyExtractor={(item) => item.color}
							showsHorizontalScrollIndicator={false}
							horizontal
							renderItem={({ item }) => {
								return (
									<Color
									onPress={() => setColor(item.color)}
									isActive={color === item.color}
									bgColor={item.color}
									>
									 <Feather name={color === item.color ? 'check-circle' : 'circle'} color="white" size={25} style={{height: 25}}/>

									</Color>
								)
							}}
							ItemSeparatorComponent={() => <Separator />}


						/>
					</ColorsSelect>
					<TransactionTypes>
						<TransactionTypeButton
							isActive={transactionType === 'positive'}
							type="up"
							title="Income"
							onPress={() => handleTransactionTypeSelect('positive')}
							/>
						<TransactionTypeButton
							isActive={transactionType === 'negative'}
							type="down"
							title="Outcome"
							onPress={() => handleTransactionTypeSelect('negative')}
							/>
					</TransactionTypes>

				</Fields>
				<Button
					title="Salvar"
					onPress={(handleSubmit(handleRegister))}
				/>
			</Form>
			<Footer>

			</Footer>
		</Container>
	)
}
