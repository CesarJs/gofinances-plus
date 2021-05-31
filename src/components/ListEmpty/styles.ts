import styled from 'styled-components/native';

import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';


interface TransactionProps {
	type: 'positive' | 'negative';
}

export const Container = styled.View`
	background-color: ${({theme}) => theme.colors.shape};
	padding: 17px 24px;
	border-radius: 5px;
	align-items: center;
	margin-bottom: 16px;
`;


export const Title = styled.Text`
	font-size: ${RFValue(14)}px;
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.text_dark};
`;
