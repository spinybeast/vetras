import React from 'react';
import { Container, Content, Footer } from 'native-base';
import styles from './ApplicationStyles';
import {ScrollView, KeyboardAvoidingView} from "react-native";

export default function Layout({centeredContent = true, footer, children}) {
    let center = {justifyContent: centeredContent ? 'center' : 'flex-start'};
    let style = {...styles.flexColumn, ...center};

    return <Container>
        <KeyboardAvoidingView style={style} behavior="padding" enabled keyboardVerticalOffset={50}>
            <ScrollView contentContainerStyle={{flexGrow: 1, ...center}} keyboardShouldPersistTaps="always">
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
        {
            footer && <Footer>{footer}</Footer>
        }
    </Container>;
}
