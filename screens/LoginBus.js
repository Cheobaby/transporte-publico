import React from "react";
import { Text, TextInput, View, StyleSheet, Button, Image, ImageBackground, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginBus = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/fondo.jpg')}
                resizeMode="cover"
                style={styles.imageBackGround}>
                <Image source={require('../assets/log.png')} style={styles.image} />
                <View style={styles.content}>
                    <Text style={styles.title}>LOGIN</Text>
                    <Text style={styles.subtitle}>¡Empieza tu viaje! Inicia sesión ahora.</Text>
                </View>
                <View style={styles.inputsContainer}>
                    <Text style={styles.labels}>Correo Electrónico</Text>
                    <TextInput placeholder="example@gmail.com"
                        style={styles.inputs} />
                    <Text style={styles.labels}>Contraseña</Text>
                    <TextInput style={styles.inputs}
                        placeholder="Ingrese su contraseña"
                        secureTextEntry />
                </View>
                <View style={styles.buttonView}>
                    <Button title="Iniciar Sesión" onPress={() => { navigation.navigate('Main') }} />
                    <Text style={styles.signUpLabel}>
                        ¿No tienes una cuenta? <Text style={styles.boldText}>Crear Cuenta</Text>
                    </Text>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackGround: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width: windowWidth * 0.8,
        height: windowHeight * 0.2,
        alignSelf: 'center',
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: windowWidth * 0.07,
        marginTop: windowHeight * 0.1,
        color: '#FFFFFF',
    },
    subtitle: {
        fontSize: windowWidth * 0.025,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    inputsContainer: {
        marginTop: windowHeight * 0.05,
        alignItems: 'center',
    },
    labels: {
        width: '85%',
        paddingLeft: windowWidth * 0.05,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    inputs: {
        width: '85%',
        height: windowHeight * 0.06,
        fontSize: windowWidth * 0.035,
        borderRadius: windowHeight * 0.015,
        paddingLeft: windowWidth * 0.02,
        marginTop: windowHeight * 0.01,
        backgroundColor: '#FFFFFF',
        marginVertical: windowHeight * 0.01,
    },
    buttonView: {
        width: '85%',
        marginTop: windowHeight * 0.02,
        alignSelf: 'center',
    },
    signUpLabel: {
        marginTop: windowHeight * 0.02,
        alignItems: 'center',
        color: '#FFFFFF',
        fontSize: windowWidth * 0.035,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default LoginBus;
