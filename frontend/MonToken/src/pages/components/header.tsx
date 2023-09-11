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
            <ConnectButton />
        </div>
    )
}

export default Header