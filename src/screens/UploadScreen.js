import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, Dimensions, View, Text } from 'react-native';
import { Context } from '../context/WebContext';
import Uploady, { useItemProgressListener } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import FeatherIcon from 'feather-icons-react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { navigate } from '../navigationRef';
import { globalStyle } from '../styles/global';



const UploadScreen = () => {
    const { state, chooseFile } = useContext(Context);

    const LogProgress = () => {
        useItemProgressListener((item) => {
            console.log(`File ${item.file.name} completed: ${item.completed}`);
            chooseFile(item.file.name)
        });

        if (state.uploadFile.length > 0) {
            return (
                <FlatList
                    data={state.uploadFile}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ padding: 10, borderWidth: 1, borderRadius: 4, borderColor: 'grey' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <FeatherIcon style={{ height: height * 0.025, paddingRight: 3 }} icon='file' />
                                        <Text style={[globalStyle.infoText, { fontSize: 14 }]}>
                                            {item}
                                        </Text>
                                    </View>
                                    <FeatherIcon style={{ height: height * 0.025 }} icon='x' />
                                </View>
                            </View>
                        )
                    }}
                />
            );
        } else {
            return null
        }
    }
    return (
        <View style={{ padding: height * 0.03}}>
            <Uploady destination={{ url: "/upload", headers: { "Authorization": `Bearer ${state.token}` } }}
                accept=".png,.jpg,.jpeg,.nii">
                <View>
                    <View style={{ paddingBottom: 10 }}>
                        <View style={styles.drag}>
                            {/* <Text style={{marginTop: height * 0.12}}>Choose your files</Text> */}
                            <View style={{ marginTop: height * 0.11 }}>
                                <UploadButton text='Upload your files' />
                            </View>
                        </View>
                    </View>
                    <LogProgress />
                    {/* <UploadButton color='blue' text='Upload your files'/> */}
                </View>
            </Uploady>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <TouchableOpacity 
                    style={[styles.button, {backgroundColor: 'black', marginHorizontal: 5}]} 
                    accessible={true}
                    accessibilityLabel='Click to get the segmented result.'
                    accessibilityHint='By clicking on this button, you will be able to view your segmented result.'
                    onPress={() => navigate('Result')}
                >
                    <Text style={globalStyle.buttonText}>
                        Get segmented result
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, {backgroundColor: 'white', width: width * 0.06, marginHorizontal: 5}]} 
                    onPress={() => navigate('Home')}
                    accessible={true}
                    accessibilityLabel='Click to cancel the uploads.'
                    accessibilityHint='By clicking on this button, you will cancel all your uploads and return to the home screen.'
                >
                    <Text style={globalStyle.buttonText, {color: 'red'}}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    drag: {
        width: width * 0.5,
        height: height * 0.3,
        borderWidth: 1,
        borderColor: 'grey',
        alignSelf: 'center',
        textAlign: 'center',
    },
    text: {
        marginTop: height * 0.12
    },
    button: { 
        marginVertical: 20, 
        alignSelf: 'center', 
        width: width * 0.12, 
        alignItems: 'center', 
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'grey',
        padding: 8 
    }

});

export default UploadScreen;
