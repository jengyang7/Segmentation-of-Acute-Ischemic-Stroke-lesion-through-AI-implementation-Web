import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, View, Text, StyleSheet, ImageBackground } from 'react-native';
import FeatherIcon from "feather-icons-react"
import { Context } from '../context/WebContext';
import { globalStyle } from '../styles/global';
import DwvComponent from '../DwvComponent';
import FileSaver from 'file-saver';
import { Infotip } from '@trendmicro/react-tooltip';
import '@trendmicro/react-tooltip/dist/react-tooltip.css';


const DatabaseScreen = () => {
    const { state, getImages, loading, deleteDBImgs, deleteAllDBImgs } = useContext(Context);
    useEffect(() => {
        getFile();
    }, []);

    const getFile = async () => {
        loading(false)
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
            console.log(state)
            let resp1 = await fetch('/retrieve_filename', reqOption1).then(data => data.json());
            for (let i = 0; i < resp1.data.length; i++) {
                let resp2 = await fetch('/retrieve/' + resp1.data[i].filename, reqOption2).then(data => data);
                console.log(resp2)
                images = [...images, { 'url': resp2.url, 'file': resp1.data[i] }];
                getImages(images);
                if (images.length === 4) {
                    loading(true)
                }
            }
            loading(true)
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    const downloadFile = async (name) => {
        const reqOption = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${state.token}` }
        }
        try {
            let resp = await fetch('/retrieve/' + name, reqOption).then(data => data.blob());
            // console.log(resp)
            FileSaver.saveAs(resp, "database_image.nii");
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    const deleteImages = async (...args) => {
        var file = [];
        if (args.length == 0) {
            file = state.images

        } else if (args.length == 1) {
            file = args
        }
        const reqOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${state.token}` }
        }
        try {
            if (args.length == 1){
                for (let i = 0; i < file.length; i++) {
                    console.log(file[i].file.filename)
                    let resp = await fetch('/delete/' + file[i].file.filename, reqOption).then(data => data.json());
                    deleteDBImgs(file[i].file._id, state.images);
                }
            } else {
                let resp = await fetch('/delete_all', reqOption).then(data => data.json());
                deleteAllDBImgs()
            }
            
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    return state.isLoading ? (
        <View style={{ justifyContent: "center", position: 'absolute', right: 0, left: 0, top: height * 0.5 }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    ) :
        (
            <View>
                <ImageBackground  style={styles.background} source={require('../images/stroke.jpg')} />
                <View style={{  margin:50, background:'white', opacity: 0.9, padding: height * 0.01 , borderRadius: 20 }}>
                    <Text style={[globalStyle.titleText, {color: 'lightslategrey'}]}>
                        Your Data
                    </Text>
                    <FeatherIcon
                        style={{ alignSelf: 'flex-end', marginRight: 100 }}
                        cursor='pointer'
                        icon='refresh-ccw'
                        onClick={() => getFile()}
                    />
                    <FeatherIcon
                        style={{ alignSelf: 'flex-end', marginRight: 100}}
                        cursor='pointer'
                        icon='trash-2'
                        onClick={async() => {
                            await deleteImages();
                            alert('You have deleted all images. Please click on the refresh icon to see your latest data.');
                        }}
                    />
                    <FlatList
                    keyExtractor={image => image.file.filename}
                    data={state.images}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.body}>
                                {/* <DwvComponent /> */}
                                <Image
                                    style={styles.databaseImage}
                                    accessible={true}
                                    accessibilityLabel='A stroke image'
                                    accessibilityHint='Click to zoom in the image.'
                                    source={require('../images/CTscan.jpg')}
                                    onClick={() => { }}
                                />
                                
                                <FeatherIcon
                                    cursor='pointer'
                                    icon='trash-2'
                                    style={{ color: 'white', position: 'absolute', left: 0 }}
                                    onClick={async() => {
                                        await deleteImages(item);
                                        alert('You have deleted an image. Please click on the refresh icon to see your latest data.')
                                    }}
                                />
                                <View style={{ justifyContent: 'space-between' }}>
                                    <Infotip
                                        tooltipStyle={{ whiteSpace: 'nowrap' }}
                                        data-html={true}
                                        content={() => {
                                            return (
                                                <Text>
                                                    {`Name: ${item.file.filename}\n`}
                                                    {`Type: NIFTI\n`}
                                                    {`Size: ${(item.file.length / 1000000).toFixed(2)}MB\n`}
                                                    {`Date uploaded: ${item.file.uploadDate.slice(0, 11)} ${'' + (parseInt(item.file.uploadDate.slice(11, 13), 10) + 8) < 24 ? (parseInt(item.file.uploadDate.slice(11, 13), 10) + 8) : (parseInt(item.file.uploadDate.slice(11, 13), 10) + 8 - 24)}${item.file.uploadDate.slice(13, 19)}`}
                                                </Text>);
                                        }}
                                    >
                                        <FeatherIcon
                                            cursor='pointer'
                                            style={{ color: 'white', position: 'absolute', right: width * 0.01, top: height * 0.01 }}
                                            icon='info'
                                        />
                                    </Infotip>
                                    <FeatherIcon
                                        cursor='pointer'
                                        style={{ color: 'white', position: 'absolute', right: width * 0.01, bottom: height * 0.01 }}
                                        icon='download'
                                        onClick={() => downloadFile(item.name)}
                                    />
                                </View>
                            </View>)
                    }}
                />
                </View>
                
                
            </View>);
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    databaseImage: {
        width: width * 0.25,
        height: height * 0.3,
        borderRadius: 20
    },
    body: {
        flexDirection: 'row',
        flex: 1,
        paddingTop: 20,
        marginLeft: width * 0.12,
        marginBottom: height * 0.15
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

export default DatabaseScreen;
