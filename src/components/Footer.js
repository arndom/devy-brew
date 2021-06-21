import { Box } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root:{
        color: "white",
        // background: "black",
        background: "linear-gradient(to right, #000000, #434343)" 

    }
})

function Footer() {
    const classes = useStyles()

    return (
        <Box
            className = {classes.root}
            height = "10vh"
            display = "flex"
            justifyContent = "center"
            alignItems = "center"
        >
            <h4>Built with 💖 by arndom</h4>
        </Box>
    )
}

export default Footer
