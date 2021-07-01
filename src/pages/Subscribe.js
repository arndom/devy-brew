import { Box, Button, TextField, FormGroup, FormControlLabel, Checkbox, makeStyles} from '@material-ui/core'
import { MailOutlined} from '@material-ui/icons'
import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'
import Footer from '../components/Footer'
// import * as ROUTES from "../constants/routes"
// import MailchimpSubscribe from "react-mailchimp-subscribe"
import axios from 'axios'
// import { useForm } from 'react-hook-form';

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

    // const history = useHistory();

    const [text, setText] = useState('');

    // const { register, handleSubmit, errors } = useForm({
	// 	mode: 'onChange',
	// 	reValidateMode: 'onChange',
	// 	defaultValues: {
	// 	  email: '',
	// 	  password: '',
	// 	},
	// });

    // const [data, loading, error, refresh] = useHarperDB({
    //     query: { operation: 'sql', sql: `select * from mailList.Mail` },
    //   });



    async function insert(text){
        const response = await axios.post(process.env.REACT_APP_HARPER_URL,{
            operation: "insert",
            schema: "mailList",
            table: "Mail",
            records: [
              {
                email: `${text}`
              },
            ],
        },
        {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Basic ${process.env.REACT_APP_HARPER_PASS}`,
            }
        })
        console.log(response)
    }

    // async function getMails(){
    //     const response = await axios.post(process.env.REACT_APP_HARPER_URL,{
    //         operation: "sql",
    //         "sql": "SELECT email FROM mailList.Mail"
    //     },
    //     {
    //         headers:{
    //             "Content-Type": "application/json",
    //             Authorization: `Basic ${process.env.REACT_APP_HARPER_PASS}`,
    //         }
    //     })
    //     console.log(response.data)
    // }

    function handleClick(text){

        insert(text)
        // history.push(ROUTES.SUBSCRIBE.FINAL)
    }
    
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

    // const onSubmit = () => {
	// 	alert("form submitted")
	// }

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
                    <h1 style ={{fontSize: "3rem"}}>Subscribe to devy brew</h1>
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
                        
                        <form action={process.env.REACT_APP_MAILCHIMP_URL} method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"  noValidate style ={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                            <TextField
                                className = {classes.texfield}
                                placeholder = "enter your email"
                                variant="outlined"
                                name="EMAIL" id="mce-EMAIL"
                                style ={{
                                    width: "18rem",
                                    marginBottom: "20px"
                                }}
                                onChange ={(e)=>{
                                    e.preventDefault()
                                    setText(e.target.value)
                                }}
                            />
                                {/* <MailchimpSubscribe EMAIL ={text} url={process.env.REACT_APP_MAILCHIMP_URL} /> */}

                                {console.log(text)}

                            <Button 
                                type = "submit"
                                style={{
                                    color: "white",
                                    background: "#1C7FF2",
                                    textTransform: "none",
                                    width : "10rem"
                                }}
                                onClick = {()=> handleClick(text) }
                            >
                                    <MailOutlined style={{paddingRight: "5px"}}/> Good 2 Go
                            </Button>

                        </form>

                    </Box>
                </Box>

            </Box>
            <Footer/>
        </Box>
    )
}

export default Subscribe
