import { Box } from '@material-ui/core'
import React from 'react'
import Footer from '../components/Footer'

function Final() {
    return (
        <Box>
            <div style={{
                height: "100vh",    
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <h1 style ={{fontSize: "3rem"}}>Thank you for joining our mailing list</h1>
                <h1 style={{marginTop : "20px", fontSize: "3rem"}}>👨‍💻 ☕</h1>
            </div>

            <Footer/>
        </Box>
    )
}

export default Final

