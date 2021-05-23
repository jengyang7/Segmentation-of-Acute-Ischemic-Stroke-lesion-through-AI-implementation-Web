import React from 'react';
import { TouchableOpacity, Dimensions, View, Text, StyleSheet, ImageBackground , Image} from 'react-native';
import { globalStyle } from '../styles/global';


const HomeScreen = () => {
    return (
        <View style={styles.body}>
            <ImageBackground imageStyle={{resizeMode: 'repeat'}} style={[styles.background, {resizeMode: 'repeat'}]} source={require('../images/stroke.jpg')} />
            <View style={{ width: width * 0.6, height: height*1.8 ,background:'white', opacity: 0.9, padding: height * 0.07 , paddingVertical:20, borderRadius: 20 }}>
                <Text style={[globalStyle.titleText, {color: "lightslategrey"}]}>
                    How to use?
                </Text>
                <View style={{ paddingVertical: 10 }}>
                    <Text style={globalStyle.subTitleText}>
                        Upload
                    </Text>
                    <Text style={[globalStyle.infoText, {lineHeight: height * 0.05}]}>
                        {`1. To be able to get your segmented result, you need to upload your images first.\n`}
                        {`2. To do that, simply navigate to the "Upload Image" interface.\n`}
                        {`3. Once you have uploaded your images, click on the "Get segmented result" button.\n`}
                        {`4. Please note that this step requires some time for processing, be patience!\n`}
                        {`5. Finally, your segmented result is ready! The segmented result will be displayed on your screen.`}
                        {`6. You may choose to store your images into our database so that you can easily refer back anytime you want.`}
                    </Text>
                </View>
                <View style={{ paddingVertical: 10 }}>
                    <Text style={globalStyle.subTitleText}>
                        Database
                    </Text>
                    <Text style={[globalStyle.infoText, {lineHeight: height * 0.05}]}>
                        {`1. To enter the database, simply navigate to the "Database" interface.\n`}
                        {`2. Here, you may choose to download the images or to view the details of the images.`}
                    </Text>
                </View>
                <TouchableOpacity style={[styles.button, {margin: 20, marginTop: 25}]}>
                    <Text style={globalStyle.buttonText}>
                        Upload Image
                    </Text>
                </TouchableOpacity>
                <Image source={require('../images/upload_tutorial.png')} style={{width: 800, height: 400, alignSelf:'center', margin: 30}} />
                <Image source={require('../images/database_tutorial.png')} style={{width: 800, height: 400 , alignSelf:'center'}} />
            </View>
        </View>)
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    body: {
        padding: height * 0.05,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    background: {
        width: width, height: height,
        resizeMode: "cover",
        backgroundColor: 'white',
        opacity: 0.3,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: 'repeat'
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'lightsteelblue',
        padding: height * 0.025,
        borderRadius: height * 0.025
    },
});

export default HomeScreen;
