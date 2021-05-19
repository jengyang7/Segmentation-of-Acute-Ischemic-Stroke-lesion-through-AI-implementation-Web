import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { globalStyle } from '../styles/global';


const HomeScreen = () => {
    return (
        <View style={styles.body}>
            <View>
                <Text style={globalStyle.titleText}>
                    How to use?
                </Text>
                <View style={{ paddingVertical: 10 }}>
                    <Text style={globalStyle.subTitleText}>
                        Upload
                    </Text>
                    <Text style={globalStyle.infoText}>
                        1. To be able to get your segmented result, you need to upload your images first.
                    </Text>
                    <Text style={globalStyle.infoText}>
                        2. To do that, simply navigate to the "Upload Image" interface.
                    </Text>
                    <Text style={globalStyle.infoText}>
                        3. Once you have uploaded your images, click on the "Get segmented result" button.
                    </Text>
                    <Text style={globalStyle.infoText}>
                        4. Please note that this step requires some time for processing, be patience!
                    </Text>
                    <Text style={globalStyle.infoText}>
                        5. Finally, your segmented result is ready! The segmented result will be displayed on your screen.
                    </Text>
                    <Text style={globalStyle.infoText}>
                        6. You may choose to store your images into our database so that you can easily
                        refer back anytime you want.
                    </Text>
                </View>
                <View style={{ paddingVertical: 10 }}>
                    <Text style={globalStyle.subTitleText}>
                        Database
                    </Text>
                    <Text style={globalStyle.infoText}>
                        1. To enter the database, simply navigate to the "Database" interface.
                    </Text>
                    <Text style={globalStyle.infoText}>
                        2. Here, you may choose to download the images or to view the details of the images.
                    </Text>
                </View>
                <Text style={globalStyle.titleText}>
                    That's it! Pretty simple right?
                </Text>
            </View>
        </View>)
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    body: {
        padding: height * 0.03,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
});

export default HomeScreen;
