import React from 'react';
import { Container, Content } from 'native-base';
import styles from './ApplicationStyles';

export default function Layout({withPadding = true, children}) {
    let style = styles.flexColumn;
    if (withPadding) {
        style = {...style, padding: 20}
    }
    return <Container>
        <Content contentContainerStyle={style}>
            {children}
        </Content>
    </Container>;
}
