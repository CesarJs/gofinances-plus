import styled, {css} from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface CategoryProps extends TouchableOpacityProps{
	isActive: boolean;
	bgColor: string;
}

export const Container = styled(GestureHandlerRootView)`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.backgorund};
`;

export const Header = styled.View`
	width: 100%;
	height: ${RFValue(113)}px;
	background-color: ${({ theme }) => theme.colors.primary};

	align-items: center;
	justify-content: flex-end;
	margin-bottom: 19px;

`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.shape};
	font-size: ${RFValue(18)}px;
`;


export const Category = styled.TouchableOpacity<CategoryProps>`
	width: 100%;
	padding: ${RFValue(15)}px;
	flex-direction: row;
	align-items: center;

	background-color: ${({bgColor, theme}) => bgColor };
`;

export const Color = styled.TouchableOpacity<CategoryProps>`
	padding: ${RFValue(20)}px;
	flex-direction: column;
	align-items: center;
	border-radius: 5px;
	border: 1px solid ${({isActive, theme}) => isActive ? theme.colors.success : theme.colors.secondary  };
	background-color: ${({bgColor, theme}) => bgColor };
`;
export const IconSelect = styled.TouchableOpacity<CategoryProps>`
	padding: ${RFValue(20)}px;
	flex-direction: column;
	align-items: center;
	border-radius: 5px;
	border: 1px solid ${({isActive, theme}) => isActive ? theme.colors.success : theme.colors.shape  };
	background-color: ${({theme}) => theme.colors.shape };
`;

export const ColorsSelect = styled.View`
	margin: 5px 0px;
	height: ${RFValue(65)}px;
	flex-direction: row;
	width: 100%;
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(20)}px;
	margin-left: 16px;
`;
export const Name = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;
`;
export const Separator = styled.View`
	margin: 5px 5px;
	width: 1px;
	background-color: ${({ theme }) => theme.colors.text};
`;
export const BoxResetData = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	padding: 5px 10px;
`;

export const IconDelete = styled.TouchableOpacity<CategoryProps>`
	padding: ${RFValue(5)}px;
	align-items: center;
	border-radius: 5px;
	width: 50px;
`;

export const Footer = styled.View`
	width: 100%;
	padding: 24px;
`;



