import React from 'react';
import { Dimensions, FlatList, Image, View, Text, StyleSheet } from 'react-native';
import FeatherIcon from "feather-icons-react"

const DatabaseScreen = () => {
    const images = [
        { 'name': 'Image1' },
        { 'name': 'Image2' },
        { 'name': 'Image3' },
        { 'name': 'Image4' },
        { 'name': 'Image5' },
        { 'name': 'Image6' }
    ]

    return (
        <View>
            <Text style={styles.text}>
                Your Data
            </Text>
            <FlatList
                keyExtractor={image => image.name}
                data={images}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.body}>
                            <Image
                                style={styles.databaseImage}
                                accessible={true}
                                accessibilityLabel='A stroke image'
                                accessibilityHint='Click to zoom in the image.'
                                source={require('../images/Capture2.JPG')}
                            />
                            <View style={{ justifyContent: 'space-between' }}>
                                <FeatherIcon
                                    style={{ color: 'white', position: 'absolute', right: width * 0.005, top: height * 0.005 }}
                                    accessible={true}
                                    accessibilityLabel='An info icon'
                                    accessibilityHint='Click to display the information of the image.'
                                    icon='info'
                                    onClick={() => { }}
                                />
                                <FeatherIcon
                                    style={{ color: 'white', position: 'absolute', right: width * 0.005, bottom: height * 0.005 }}
                                    accessible={true}
                                    accessibilityLabel='A download icon'
                                    accessibilityHint='Click to download the image.'
                                    icon='download'
                                    onClick={() => { }}
                                />
                            </View>
                        </View>)
                }}
            />
        </View>);
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    text: {
        fontSize: 40,
        alignSelf: 'center',
        marginBottom: 30
    },
    databaseImage: {
        width: width * 0.25,
        height: height * 0.3,
    },
    body: {
        flexDirection: 'row',
        flex: 1,
        paddingTop: 20,
        marginLeft: width * 0.12,
        marginBottom: height * 0.15
    }
});

export default DatabaseScreen;
