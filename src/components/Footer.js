import { Box } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root:{
        // color: "white",
        // background: "black",
        // background: "linear-gradient(to bottom, #ffffff, #434343)" 

    }
})

function Footer() {
    const classes = useStyles()

    return (
        <Box
            className = {classes.root}
            width = "100%"
            height = "12vh"
            display = "flex"
            justifyContent = "center"
            alignItems = "center"
            fontSize = "small"
            fontWeight = "500"
        >
            <p>Built with 🖤 by <a href="https://github.com/arndom" target = "_blank"  rel="noreferrer" style={{textDecoration: "underline", letterSpacing: "1.2px",color:"black"}}>arndom</a></p>
        </Box>
    )
}

export default Footer
