import React from 'react';
import { Container, Content, Footer } from 'native-base';
import styles from './ApplicationStyles';

export default function Layout({centeredContent = true, footer, children}) {
    let style = styles.flexColumn;

    if (centeredContent) {
        style = {...style, justifyContent: 'center'}
    } else {
        style = {...style, justifyContent: 'flex-start'}
    }
    return <Container>
        <Content enableOnAndroid contentContainerStyle={style}>
            {children}
        </Content>
        {
            footer && <Footer>{footer}</Footer>
        }
    </Container>;
}
