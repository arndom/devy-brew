import { Button, Typography, Box } from '@material-ui/core'
import { MailOutlined } from '@material-ui/icons'
import React from 'react'

function Landing() {
    return (
        <Box className = "landing">

            {/* banner */}
            <Box 
                className = "landing__banner"
                display = "flex"
                justifyContent = "center"
                alignItems = "center"    
            >
                <Box 
                    width = "50%"
                    display = "flex"
                    // justifyContent = "center"
                    // alignItems = "center"
                    flexDirection = "column"
                >
                    <Box
                        width = "50%"         
                    >
                        <Typography variant = "h4">
                            Devy brew
                        </Typography>
                        <Typography variant = "p">
                            some nice wordings....
                        </Typography>
                    </Box>

                    <Button style={{
                        color: "white",
                        background: "linear-gradient(to right, #232526, #414345)",
                        flex: 0,
                    }}>
                       <MailOutlined/> Subscribe
                    </Button>
                </Box>

                <Box 
                    className = "landing__bannerImage"
                    width = "50%"
                    height = "80%"
                >
                    
                </Box>
            </Box>

            {/* preview of features*/}
                {/* articles */}
                {/* jokes / games */}
            {/* call to action */}
            {/* footer */}
        </Box>
    )
}

export default Landing
