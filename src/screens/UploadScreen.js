import React, { useContext, useState } from 'react';
import { Context } from '../context/WebContext';
import ImageUploader from 'react-images-upload';


const UploadScreen = ({ navigation }) => {
    const { state } = useContext(Context);

    return (
        <ImageUploader
            withIcon={true}
            buttonText='Choose images'
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
        />
    );
};

export default UploadScreen;
