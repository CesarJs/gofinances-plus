import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';


export const Container = styled.View`
	background-color: ${({ theme }) => theme.colors.primary};
	width: 100%;
	height: ${RFValue(113)}px;
	flex-direction: row;
	align-items: flex-end;
	justify-content: space-between;
	padding-bottom: 10px;
	padding: 10px 15px;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.shape};
	font-size: ${RFValue(18)}px;
`;
export const EmptyComponenet = styled.View`
	opacity: 0;
	width: 40px;
`;
