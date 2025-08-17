import { Platform } from 'react-native';

export const FONTS = {
    POPPINS: Platform.select({
        ios: 'Poppins Regular',
        android: 'Poppins-Regular',
    }),
    MONTSERRAT: Platform.select({
        ios: 'Montserrat',
        android: 'Montserrat-VariableFont_wght',
    }),
};