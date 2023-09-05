import React from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";


const Header = () => {
    const headerStyle = {
        width: '100%',
        height: '30px',
        backgroundColor: 'white',
        borderBottom: '1px solid grey',
        paddingTop: '20px',
        paddingBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
    return (
        <div style={headerStyle}>
            <ConnectButton label="我是自定义按钮文字"></ConnectButton>
        </div>
    )
}

export default Header