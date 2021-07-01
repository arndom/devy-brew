import { Box } from '@material-ui/core';
import { Link } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Puff } from 'svg-loaders-react'

/*** @description: Daily papers*/

const producthuntKey =  process.env.REACT_APP_PRODUCTHUNT_KEY;

function Paper() {

    const [devMarkdownData, setDevMarkdown] = useState(``)
    const [hashMarkdownData, setHashMarkdown] = useState(``)

    const [dev, setDev] = useState({});
    const [hashnode, setHashnode] = useState({});
    const [product, setProduct] = useState([]);

    async function fetchHashnodeMarkdown(slug, hostname){
        const response =  await axios.post("https://api.hashnode.com/",{
            query:`
                query {
                    post(slug: "${slug}", hostname: "${hostname}"){
                    title
                    cuid
                    contentMarkdown
                    }
                }
            `
        })
        setHashMarkdown(response.data.data.post.contentMarkdown)
    }

    async function fetchDevMarkdown(id){
        const response = await axios.get(`https://dev.to/api/articles/${id}`)
        // console.log(response.data.body_markdown)
        setDevMarkdown(response.data.body_markdown)
    }

    async function fetchDev(){
        const response = await axios.get("https://dev.to/api/articles?top=1")
        setDev(response.data[0])
    }

    async function fetchHashnode(){
        const response =  await axios.post("https://api.hashnode.com/",{
            query:`
                query{
                    storiesFeed(type: BEST, page: 0) {
                        cuid
                        title
                        author {
                          username
                          publicationDomain
                          blogHandle
                        }
                        slug
                        coverImage
                        dateFeatured
                        totalReactions
                    }
                  }
            `
        })
        setHashnode(response.data.data.storiesFeed.filter( post =>post.author.publicationDomain !== "")[0])
    }

    async function fetchProduct(){
        const response =  await axios.post(" https://api.producthunt.com/v2/api/graphql",{
            query:`
                query{
                    posts{
                        edges{
                            cursor
                            node{
                                id
                                name
                                  user{
                                  name
                                }
                                featuredAt
                                tagline
                                description
                                url
                                votesCount
                                thumbnail{
                                    type
                                    url
                                }
                            }
                        }
                    }
                }
            `
        },
        {
            headers: {
                Authorization: `Bearer ${producthuntKey}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        }

        )
        setProduct(response.data.data.posts.edges.slice(0, 5).map( prod => prod.node))
    }

    // async function feth

    useEffect(()=>{
        fetchDev()
        fetchHashnode()
        fetchProduct()
    },[])

    useEffect(()=>{
        dev.id && fetchDevMarkdown(dev.id)
         // eslint-disable-next-line
    },[dev])

    useEffect(()=>{
        hashnode.author && fetchHashnodeMarkdown(hashnode.slug, hashnode.author.publicationDomain)
         // eslint-disable-next-line
    },[hashnode])
    
    return (
        <div className = "paper">
            
            <div className = "markdownPaper">
                <h1 style = {{
                    color: "rgba(149, 212, 207, 1)",
                    textTransform: "uppercase",
                    fontWeight: "800",
                    letterSpacing: "0.055rem",
                    paddingBottom:"1rem"}} >
                   Hashnode    
                </h1>

                {hashnode.title ===  undefined ?<Puff stroke="rgba(149, 212, 207, 1)" width="100%" height ="100%" fontSize = "2rem"/> 
                :
                    <>
                    <h2 style ={{paddingBottom:"1.5rem"}}>
                        <a href = {`https://${hashnode.author?.publicationDomain === '' ? hashnode.author.blogHandle + '.hashnode.dev/' : hashnode.author?.publicationDomain + '/'}${hashnode.slug}`} target = "_blank"  rel="noreferrer">
                            {hashnode.title}
                            <span style={{paddingLeft:"5px"}}><Link/></span>
                        </a>
                    </h2>
                    <ReactMarkdown  children = {hashMarkdownData}/>
                    </>
                }
            </div>
            
            <div className = "markdownPaper">
                <h1  style = {{
                    color: "rgba(149, 212, 207, 1)",
                    textTransform: "uppercase",
                    fontWeight: "800",
                    letterSpacing: "0.055rem",
                    paddingBottom:"1rem"}} >
                    Dev.to    
                </h1>

                {dev.title === undefined  ? <Puff stroke="rgba(149, 212, 207, 1)" width="100%" height ="100%" fontSize = "2rem"/>
                :
                <>
                    <h2 style={{paddingBottom:"1.5rem"}}>
                        <a href = {dev.url} target = "_blank"  rel="noreferrer">
                            {dev.title}
                            <span style={{paddingLeft:"5px"}}><Link/></span>
                        </a>
                    </h2>
                    <ReactMarkdown  children = {devMarkdownData}/>
                </>
                 }
            </div>
            
            <div className = "markdownPaper" style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between" 
                }}>

                <h1  style = {{
                    color: "rgba(149, 212, 207, 1)",
                    textTransform: "uppercase",
                    fontWeight: "800",
                    letterSpacing: "0.055rem",
                    paddingBottom:"1rem"}} >
                    Producthunt   
                </h1>

                <h2 style={{paddingBottom:"1.5rem"}}>
                    <p>
                        Top 5 products
                    </p>
                </h2>

                {product[0] === undefined  ? <Puff stroke="rgba(149, 212, 207, 1)" width="100%" height ="100%" fontSize = "2rem"/> 
                :
                <>
                {
                    product.map( (prod) =>{ return(

                        <Box
                            key ={prod.id}
                            padding = ".5rem"
                            style ={{
                                backgroundColor: "whitesmoke"
                            }}
                            display = "flex"
                            justifyContent = "space-between"
                            borderRadius = "5px"
                            marginBottom ="1rem"
                        >
                            <Box
                                display= "flex"
                                flexDirection = "column"
                                justifyContent="space-between"
                            >
                                <p style={{display: "flex", alignItems: "center",  fontSize:"1rem", fontWeight: 600}}>
                                    {prod.name}
                                    <a href = { prod.url === undefined ? "#" : prod.url } style ={{paddingLeft:"5px", display:"flex"}} target = "_blank"  rel="noreferrer"><Link/></a>
                                </p>
                                <p style={{fontSize:".9rem"}}>{prod.tagline}</p>
                            </Box>
                            
                            <Box
                                width = "5rem"
                                height = "5rem"
                            >
                                <img style ={{display: "flex", width:"100%", height: "100%", objectFit:"contain"}}alt = "featured" src ={prod.thumbnail?.url}/>
                            </Box>

                        </Box>
                    )} )
                }
                </>
                }
            </div>
        </div>
    )
}


export default Paper
