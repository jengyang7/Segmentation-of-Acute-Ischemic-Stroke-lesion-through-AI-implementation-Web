import React, { useContext, useState ,useEffect} from 'react';
import { Context } from '../context/WebContext';
import Uploady, { useItemProgressListener } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogProgress = () => {
    useItemProgressListener((item) => {
        console.log(`File ${item.file.name} completed: ${item.completed}`);
    });

    return null;
}

const UploadScreen = ({ navigation }) => {
    const { state } = useContext(Context);
    
    return (
        <Uploady destination={{ url: "/upload" ,headers:{"Authorization": `Bearer ${state.token}`}}}
        accept=".png,.jpg,.jpeg,.nii">
            <LogProgress />
            <UploadButton />
        </Uploady>);
};

export default UploadScreen;
