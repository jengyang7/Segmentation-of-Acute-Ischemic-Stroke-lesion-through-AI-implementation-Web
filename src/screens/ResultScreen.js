import React, { useContext, useEffect } from 'react';
import { TouchableOpacity, Dimensions, Image, Text, View, TextInput, StyleSheet } from 'react-native';
import { Context } from '../context/WebContext';
import { navigate } from '../navigationRef';
import FeatherIcon from 'feather-icons-react';
import { globalStyle } from '../styles/global';


const ResultScreen = () => {
    return (
        <View style={{ padding: height * 0.03 }}>
            <Text style={globalStyle.titleText}>
                Result
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 50 }}>

                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <FeatherIcon
                            style={{ marginRight: width * 0.08, marginTop: height * 0.2 }}
                            icon='chevron-left'
                            onClick={() => { }}
                        />
                        <Image
                            style={{ width: width * 0.3, height: height * 0.5 }}
                            accessible={true}
                            accessibilityLabel='A stroke image'
                            accessibilityHint='Click to zoom in the image.'
                            source={require('../images/Capture2.JPG')}
                        />
                        <FeatherIcon
                            style={{ marginLeft: width * 0.08, marginTop: height * 0.2 }}
                            icon='chevron-right'
                            onClick={() => { }}
                        />
                    </View>
                    <TouchableOpacity style={{ marginTop: 20, alignSelf: 'center', backgroundColor: 'black', alingItems: 'center', borderRadius: 4, padding: 8 }}>
                        <Text style={globalStyle.buttonText}>
                            Delete image
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ borderWidth: 1, width: width * 0.23 }}>
                    <View style={{ padding: 15 }}>
                        <Text style={[globalStyle.subTitleText, { alignSelf: 'center', fontWeight: 'bold' }]}>
                            Details
                        </Text>
                        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                            <Text style={[globalStyle.infoText, { fontWeight: 'bold' }]}>
                                White Area:
                            </Text>
                            <Text style={[globalStyle.infoText, { marginHorizontal: 5 }]}>
                                is a stroke lesion
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                            <Text style={[globalStyle.infoText, { fontWeight: 'bold' }]}>
                                Black Area:
                            </Text>
                            <Text style={[globalStyle.infoText, { marginHorizontal: 5 }]}>
                                is not a stroke lesion
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const { height, width } = Dimensions.get('window');

export default ResultScreen;