import * as React from "react";
import { Button, ConfigProvider, Layout } from 'antd';

function Footer() {
    const { Footer } = Layout;
    const emailMTS = () => {

    }

    return(
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorLink: 'white',
                        colorLinkHover: '#6ce3c6',
                        colorLinkActive: '#20A785'
                    }
                },
            }}>
                <Footer
                    style={{
                        background: '#242437',
                        textAlign: 'right',
                        color: 'white',
                    }}
                >

                    Contact:

                    <Button
                        type="link"
                        size="large"
                        onClick={emailMTS}
                        >
                            MTS
                    </Button>

                </Footer>
            </ConfigProvider>
    )
}

export default Footer;