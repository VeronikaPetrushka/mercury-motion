import { StyleSheet, Dimensions } from "react-native";
import { FONTS } from "../../assets/fonts/fonts";

export const { height, width } = Dimensions.get("window");

export const yellowGradient = ['#F4DF13', '#FCB401'];
export const blueGradient = ['#0D1F58', '#0D1F58'];

export const commonMotion = StyleSheet.create({

    container: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: height * 0.08
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },

    heading: {
        fontSize: 24,
        fontWeight: '600',
        fontFamily: FONTS.POPPINS,
        marginBottom: 12,
        color: '#fff',
        alignSelf: 'center',
        textAlign: 'center'
    },

    title: {
        fontSize: 24,
        fontWeight: '500',
        fontFamily: FONTS.POPPINS,
        marginBottom: 5,
        color: '#fff',
        textAlign: 'center'
    },

    textWhite: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: FONTS.POPPINS,
        color: '#fff',
        textAlign: 'center'
    },

    textBlue: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: FONTS.POPPINS,
        color: '#4D9EFF'
    },

    button: {
        width: '100%',
        height: 51,
        borderRadius: 300,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },

    gradient: {
        width: '100%',
        height: '100%',
        borderRadius: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: FONTS.POPPINS,
        color: '#fff'
    },

    yellowActBtn: {
        width: 65,
        height: 65,
        resizeMode: 'contain'
    },

    backBtn: {
        width: 56,
        height: 56,
        resizeMode: 'contain',
        position: 'absolute',
        top: height * 0.07,
        left: 20
    },

    setBtn: {
        width: '100%',
        borderRadius: 300,
        backgroundColor: '#0D1F58',
        borderWidth: 1,
        borderColor: '#2D4FA5',
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardText: {
        fontSize: 12,
        fontWeight: '300',
        fontFamily: FONTS.POPPINS,
        color: '#4D9EFF'
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: '500',
        fontFamily: FONTS.POPPINS,
        color: '#fff'
    },

    readText: {
        fontSize: 16,
        fontWeight: '300',
        fontFamily: FONTS.POPPINS,
        color: '#4D9EFF'
    },

    readImage: {
        width: '100%',
        height: 206,
        resizeMode: 'cover',
        borderRadius: 60,
        marginBottom: 8
    },

    moon: {
        width: height * 0.3,
        height: height * 0.3,
        resizeMode: 'contain'
    },

    twoPlanetsImage: {
        width: '100%',
        height: height * 0.45,
        resizeMode: 'contain',
        marginBottom: 10
    }

});


export const formMotion = StyleSheet.create({

    motionInput: {
        width: '100%',
        backgroundColor: '#0F2767',
        borderRadius: 60,
        borderWidth: 1,
        borderColor: '#2D4FA5',
        padding: 16,
        marginBottom: 18,
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        fontFamily: FONTS.POPPINS
    },

    motionLabel: {
        fontSize: 13,
        fontWeight: '300',
        fontFamily: FONTS.POPPINS,
        color: '#fff',
        marginBottom: 3
    },

    buttonDisabledText: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: FONTS.POPPINS,
        color: '#4D9EFF'
    }

});


export const analyticsMotion = StyleSheet.create({

    dataContainer: {
        width: '48%',
        borderRadius: 20,
        backgroundColor: '#0D1F58',
        paddingVertical: 20,
        paddingHorizontal: 16
    }

});


export const motionPanel = StyleSheet.create({

    container: {
        width: '90%',
        borderRadius: 300,
        backgroundColor: '#0D1F58',
        borderWidth: 1,
        borderColor: '#2D4FA5',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    button: {
        width: 65,
        height: 65,
        borderRadius: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },

    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    }

});

export const reflectionMotion = StyleSheet.create({

    poster: {
        width: '100%', 
        height: 200, 
        resizeMode: 'cover', 
        borderRadius: 50, 
        marginBottom: 8
    },

    title: {
        fontSize: 18,
        fontWeight: '500',
        fontFamily: FONTS.POPPINS,
        color: '#fff',
        marginBottom: 3
    },

    desc: {
        fontSize: 13,
        fontWeight: '300',
        fontFamily: FONTS.POPPINS,
        color: '#4D9EFF',
    },

    customContainer: {
        width: '100%',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#2D4FA5',
        marginBottom: 12,
        backgroundColor: '#0D1F58'
    }

});


export const styles = StyleSheet.create({

    progressBarContainer: {
        width: '100%',
        padding: 20,
    },

    progressBarBackground: {
        height: 10,
        width: '100%',
        backgroundColor: '#4D9EFF',
        borderRadius: 5,
        overflow: 'hidden',
    },

    progressBarFill: {
        height: '100%',
        backgroundColor: '#F4DF13',
        borderRadius: 5,
    },

    scoreText: {
        color: 'white',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'Montserrat',
    },

    shine: {
        position: 'absolute',
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },

    moonContainer: {
        position: 'absolute',
        width: 100,
        height: 100,
    },

    moon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

});