import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';


export const Container = styled(RectButton)`
	width: 36px;
	background-color: ${({ theme }) => theme.colors.primary};
	border: 1.5px solid;
	border-color: ${({ theme }) => theme.colors.seccess_light};
	border-radius: 5px;
	align-items: center;
	padding: 10px;
`;


export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.medium};
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.shape};
`;
