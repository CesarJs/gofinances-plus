import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Modal } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Button } from '../../components/Form/Button';
import { useAuth } from '../../hooks/auth';

import { categories } from '../../utils/categories';


import {
	Container,
	Title,
	Category,
	Icon,
	Name,
	Separator,
	Footer,
	AddNewCategory

} from './styles';
import { CategoryCreate } from '../CategoryCreate';
import { Header } from '../../components/Header';

interface Category {
	key: string;
	name: string;
	type: string;
	icon?: string;

}

interface Props {
	category: Category;
	setCategory: (category: Category) => void;
	closeSelectCategory: () => void;
	transactionType: string;
	setTransacionType: (type : string) => void;
}

export function CategorySelect({
	category,
	setCategory,
	closeSelectCategory,
	transactionType,
	setTransacionType
} : Props) {
	const [ openModal , setOpenModal ] = useState(false);
	const [ update , setUpdate ] = useState(false);
	const [ categoryFilter, setCategoryFilter ] = useState<Category[]>([] as Category[]);
	const [ categoriesData, setCategoriesData ] = useState<Category[]>([] as Category[]);
	const { user } = useAuth();
	const dataKey = `@gofinacen:transacations_type:${user.id}`;
	async function getDataFromStorage(){
		try {
			const dataStorage =  await AsyncStorage.getItem(dataKey);
			if(dataStorage){
				const data_ = JSON.parse(dataStorage) as Category[];
				setCategoriesData(data_);
			}else{
				setDataFromStorage(dataKey, categories);
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
	function handleCategorySelect(newCategory : Category){
		if(newCategory.key === category.key){
			setCategory({
				key: 'category',
				name: 'Categoria',
				type: ''
			});
			setTransacionType('');
		}else{
			setCategory(newCategory);
			setTransacionType(newCategory.type);
		}
	}

	function handleCloseCreateCategory(){
		setOpenModal(!openModal);
	}

	useEffect(() => {
		getDataFromStorage();

	}, [update]);
	useEffect(() => {
		if(categoriesData.length){
			const filter = categoriesData.filter((item) => transactionType === '' || item.type === transactionType);
			setCategoryFilter(filter);
		}
	}, [categoriesData, transactionType]);
	return (
		<Container>
			<Header
				title={`Categorias`}
				leftButton={closeSelectCategory}
			/>

			<FlatList
				data={categoryFilter}
				style={{flex: 1, width: '100%'}}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => (
					<Category
						onPress={() => handleCategorySelect(item)}
						isActive={category.key === item.key}
					>
						<Icon name={ item.icon } />
						<Name> { item.name }</Name>
					</Category>
				)}
				ItemSeparatorComponent={() => <Separator />}
				ListEmptyComponent={<></>}
				ListFooterComponent={
					<AddNewCategory
						isActive={false}
						onPress={handleCloseCreateCategory}
					>
						<Icon name="plus-square" />
						<Name> Adicionar nova</Name>
					</AddNewCategory>
				}
			/>
			<Footer>
				<Button
					title="Selecionar"
					onPress={closeSelectCategory}
				/>
			</Footer>
			<Modal visible={openModal}>
				<CategoryCreate
					category={category}
					handleClose={handleCloseCreateCategory}
					getDataFromStorage={getDataFromStorage}
				/>
			</Modal>
		</Container>
	)
}
