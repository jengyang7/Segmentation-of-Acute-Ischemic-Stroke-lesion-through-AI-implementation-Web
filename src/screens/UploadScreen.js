import React, { useContext, useState } from 'react';
import { Context } from '../context/WebContext';
import Uploady, { useItemProgressListener } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";

const LogProgress = () => {
    useItemProgressListener((item) => {
        console.log(`File ${item.file.name} completed: ${item.completed}`);
    });

    return null;
}

const UploadScreen = ({ navigation }) => {
    const { state } = useContext(Context);

    return (<Uploady
        destination={{ url: "/upload" }}>
        <LogProgress/>   
        <UploadButton/>
    </Uploady>);
};

export default UploadScreen;
