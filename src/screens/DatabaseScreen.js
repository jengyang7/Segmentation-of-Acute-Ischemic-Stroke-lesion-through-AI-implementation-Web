import React, { useContext, useEffect } from 'react';
import { Dimensions, FlatList, Image, View, Text, StyleSheet } from 'react-native';
import FeatherIcon from "feather-icons-react"
import { Context } from '../context/WebContext';
import { globalStyle } from '../styles/global';
import DwvComponent from '../DwvComponent';

const DatabaseScreen = () => {
    const { state, getImages } = useContext(Context);

    useEffect(() => {
        // getFile(state.token, (images) => getImages(images));
        getFile();
    });

    const getFile = async () => {
        let images = [];
        const reqOption1 = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${state.token}` }
        };
        const reqOption2 = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${state.token}` }
        };
        try {
            let resp1 = await fetch('/retrieve_filename', reqOption1).then(data => data.json());
            for (let i = 0; i < resp1.data.length; i++) {
                let resp2 = await fetch('/retrieve/' + resp1.data[i].filename, reqOption2).then(data => data);
                images = [...images, { 'name': resp2.url }];
            }
            getImages(images);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    return (
        <View>
            <Text style={globalStyle.titleText}>
                Your Data
            </Text>
            <FlatList
                keyExtractor={image => image.name}
                data={state.images}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.body}>
                            <DwvComponent />
                            {/* <Image
                                style={styles.databaseImage}
                                accessible={true}
                                accessibilityLabel='A stroke image'
                                accessibilityHint='Click to zoom in the image.'
                                source={{ uri: item.name }}
                            /> */}
                            <View style={{ justifyContent: 'space-between' }}>
                                <FeatherIcon
                                    style={{ color: 'white', position: 'absolute', right: width * 0.005, top: height * 0.005 }}
                                    icon='info'
                                    onClick={() => { }}
                                />
                                <FeatherIcon
                                    style={{ color: 'white', position: 'absolute', right: width * 0.005, bottom: height * 0.005 }}
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
