import { Box, Button, TextField, FormGroup, FormControlLabel, Checkbox, makeStyles} from '@material-ui/core'
import { MailOutlined} from '@material-ui/icons'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Footer from '../components/Footer'
import * as ROUTES from "../constants/routes"

const useStyles = makeStyles({

    checked:{
        marginBottom: ".75rem" ,
        '& .MuiCheckbox-colorPrimary.Mui-checked':{
            color: "#1C7FF2"
        }
    },

    texfield:{

        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1C7FF2"
          },

        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1C7FF2"
          },
    }
    
})

function Subscribe() {

    const classes = useStyles()

    const history = useHistory();
    
    const [checked, setChecked] = React.useState({
        articles: true,
        devto: true,
        hashnode: true,
        producthunt: true,
        gameSection: true,
        jokesSection: true,
      });
    
    const handleChange = (event) => {
        setChecked({ ...checked, [event.target.name]: event.target.checked });
    };

    return (
        <Box
            display = "flex"
            flexDirection ="column"
            justifyContent = "center"
            alignItems = "center"
        >
            <Box
                width = "90vw"
                height = "100vh"
                display = "flex"
                flexDirection = "column"
                marginTop = "28vh"
            >
                <Box display = "flex"
                     flexDirection = "column"
                     alignItems = "center"
                     marginBottom =".7rem">
                    <h1 style ={{fontSize: "3rem"}}>Subscribe to our newsletter</h1>
                </Box>

                <Box display = "flex"
                     flexDirection = "column"
                     alignItems = "center" >
                    {/* CHECKBOXES */}                            
                    <FormGroup className = {classes.checked}>
                        <Box
                            // marginLeft = "20px"
                            display= "flex"
                            flexDirection = "row">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked.devto}
                                        onChange={handleChange}
                                        name="devto"
                                        color="primary"
                                    />
                                }
                                label="dev.to"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked.hashnode}
                                        onChange={handleChange}
                                        name="hashnode"
                                        color="primary"
                                    />
                                }
                                label="hashnode"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked.producthunt}
                                        onChange={handleChange}
                                        name="producthunt"
                                        color="primary"
                                    />
                                }
                                label="producthunt"
                            />
                        </Box>
                    </FormGroup>

                    {/* EMAIL */}
                    <Box display = "flex"
                        flexDirection = "column"
                        alignItems = "center" >

                        <TextField
                            className = {classes.texfield}
                            placeholder = "enter your email"
                            variant="outlined"
                            style ={{
                                width: "18rem",
                                marginBottom: "20px"
                            }}
                        />
                        <Button 
                            style={{
                                color: "white",
                                background: "#1C7FF2",
                                textTransform: "none"
                            }}
                            onClick = {()=> history.push(ROUTES.SUBSCRIBE.FINAL)}
                        >
                                <MailOutlined style={{paddingRight: "5px"}}/> Good 2 Go
                        </Button>
                    </Box>
                </Box>

            </Box>
            <Footer/>
        </Box>
    )
}

export default Subscribe
