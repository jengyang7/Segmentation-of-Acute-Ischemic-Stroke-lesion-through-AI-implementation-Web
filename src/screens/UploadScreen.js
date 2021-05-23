import React, { useContext, useEffect, useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Dimensions, View, Text ,ImageBackground} from 'react-native';
import { Context } from '../context/WebContext';
import Uploady, { useItemProgressListener, UploadyContext, useUploady } from "@rpldy/uploady";
import FeatherIcon from 'feather-icons-react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { navigate } from '../navigationRef';
import { globalStyle } from '../styles/global';
import { Ubutton } from '../customs/UploadButton';
import { TramOutlined } from '@material-ui/icons';
import FileSaver from 'file-saver';



const UploadScreen = () => {
    const { state, chooseFile, deleteImg, loading } = useContext(Context);
    const LogProgress = () => {
        useItemProgressListener((item) => {            
            console.log(item)
            console.log(`File ${item.file.name} completed: ${item.completed}`);
            
            
            if (item.completed === 100) {
                chooseFile(item)
                loading(true)
            } 
        });

        if (state.uploadFile.length > 0) {
            return (
                    <FlatList
                        keyExtractor={uploadFile => uploadFile.file.id}
                        data={state.uploadFile}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    
                                    <View style={{ alignSelf: 'center', padding: 10, borderWidth: 1, borderRadius: 4, borderColor: 'grey', width: width * 0.5 }}>
                                    
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <FeatherIcon style={{ height: height * 0.025, paddingRight: 3 }} icon='file' />
                                            <Text style={[globalStyle.infoText, { fontSize: 14 }]}>
                                                {item.file.name}
                                            </Text>
                                        </View>
                                        <FeatherIcon
                                            cursor='pointer'
                                            style={{ height: height * 0.025 }}
                                            icon='x'
                                            onClick={() => deleteImages(item)}
                                        />
                                    </View>
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

    const predict = async () => {
        loading(false);
        for (let i = 0; i < state.uploadFile.length; i++) {
            const formData = new FormData();
            formData.append('file', state.uploadFile[i].file);
            console.log(state.uploadFile[i])
            const reqOption = {
                method: 'POST',
                headers: { 'enctype': 'multipart/form-data', },
                body: formData
            }
            try {
                let resp = await fetch('https://2b4a0d453c33.ngrok.io/predict', reqOption).then(data => data.blob());
                console.log(resp);
                FileSaver.saveAs(resp, "segmented_result.nii");
                loading(state.isLoading)
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        }
    }


    const deleteImages = async (...args) => {
        var file = [];
        var uFiles;
        if (args.length == 0) {
            file = state.uploadFile
            
        } else if (args.length == 1) {
            file = args
        }
        const reqOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${state.token}` }
        }
        try {
            for (let i = 0; i < file.length; i++) {
                let resp = await fetch('/delete/' + file[i].file.name, reqOption).then(data => data.json());
                deleteImg(file[i], state.uploadFile);
            }

        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    const checkUpload = () => {
        if (state.uploadFile.length > 0) {
            return true;
        }
        return false;
    }

    return (
        <View style={{  background:'white', opacity: 0.9, padding: height * 0.01 , borderRadius: 20 }}>
            <ImageBackground  style={styles.background} source={require('../images/stroke.jpg')} />
            <Uploady destination={{ url: "/upload", headers: { "Authorization": `Bearer ${state.token}` } }}
                accept=".nii">
                <View style={{  background:'white', opacity: 0.9, paddingHorizontal: height * 0.05, paddingVertical: height * 0.1, margin: height * 0.1,marginHorizontal: height * 0.3,borderRadius: 20}}>
                    <View style={{ paddingBottom: 10 }}>
                        <View style={styles.drag}>
                            <View style={{ marginTop: height * 0.11 }}>
                                <Ubutton />
                            </View>
                        </View>
                    </View>
                    <LogProgress />
                </View>
            </Uploady>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <View style={{  width: 1000,  background:'white', opacity: 0.9,borderRadius: 20, flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'lightsteelblue', marginHorizontal: 5 ,textAlign: 'center'}]}
                    accessible={true}
                    accessibilityLabel='Click to get the segmented result.'
                    accessibilityHint='By clicking on this button, you will be able to view your segmented result.'
                    onPress={() => checkUpload() ? predict() : alert('You have not uploaded any files yet!')}
                >
                    <Text style={globalStyle.buttonText, {color: 'white', fontWeight:'bold', fontSize: height* 0.0222, }}>
                        Download segmented result
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#e95558', width: width * 0.06, marginHorizontal: 5 , textAlign: 'center', padding:height* 0.0222}]}
                    onPress={() => navigate('Home')}
                    accessible={true}
                    accessibilityLabel='Click to cancel the uploads.'
                    accessibilityHint='By clicking on this button, you will cancel all your uploads and return to the home screen.'
                    onPress={async () => { await deleteImages(); navigate('Home') }}
                >
                    <Text style={globalStyle.buttonText, { color: 'white' , fontWeight:'bold',  fontSize: height* 0.0222}}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
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
        borderRadius: 10,
        padding: 15
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
        bottom: 0
    },

});

export default UploadScreen;