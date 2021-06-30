import React, { useEffect, useState } from 'react'
import * as ROUTES from "../constants/routes"

import axios from 'axios'
import { Button} from '@material-ui/core'
import { ArrowForward, MailOutlined} from '@material-ui/icons'
import { Link, useHistory } from 'react-router-dom'
// import ReactMarkdown from "react-markdown";

import FeaturedArticle from '../components/FeaturedArticle'
import Footer from '../components/Footer'

const producthuntKey =  process.env.REACT_APP_PRODUCTHUNT_KEY;

function Landing() {

    const history = useHistory();

    const [dev, setDev] = useState({});
    const [hashnode, setHashnode] = useState({});
    const [product, setProduct] = useState({});
    const dateNow = new Date().toLocaleDateString() 

    const [devMarkdown, setDevMarkdown] = useState(``)
    const [hashMarkdown, setHashMarkdown] = useState(``)

    async function fetchDev(){
        const response = await axios.get("https://dev.to/api/articles?top=1")
        setDev(response.data[0])
    }

    async function fetchDevMarkdown(id){
        const response = await axios.get(`https://dev.to/api/articles/${id}`)
        // console.log(response.data.body_markdown)
        setDevMarkdown(response.data.body_markdown)
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
        setProduct(response.data.data.posts.edges[0].node)
    }

    // async function feth

    useEffect(()=>{
        fetchDev()
        fetchHashnode()
        fetchProduct()
    },[])

    useEffect(()=>{
        fetchDevMarkdown(dev.id)
    },[dev])

    useEffect(()=>{
        hashnode.author && fetchHashnodeMarkdown(hashnode.slug, hashnode.author.publicationDomain)
    },[hashnode])

    return (
        <div className = "landing">
            {/* banner */}
            <div className = "landing__banner">
                <div className = "container splitLR">
                    
                    {/* text */}
                    <div className = "landing__bannerLeft">
                        <div className = "landing__bannerLeftText">
                            <h1>Devy brew {/* ☕ */}</h1>
                            <p>Get daily mails curated with articles from the most popular dev plattforms. Make us part of your daily routine to stay informed.</p>
                        </div>
                        <Button 
                            style={{
                                color: "white",
                                background: "linear-gradient(to right, #232526, #633E30)",
                                // background: "linear-gradient(to right, #514A9D, #24C6DC)",
                                textTransform: "none",
                                width: "8rem",
                                boxShadow: "0px 6px 18px -9px rgba(0,0,0, 0.75)"

                            }}
                            onClick = {()=>history.push(ROUTES.SUBSCRIBE.INDEX)}
                        >
                            <MailOutlined style ={{paddingRight: "5px"}}/> Subscribe
                        </Button>
                    </div>

                    {/*image*/}
                    <div className = "landing__bannerRight">
                        
                    </div>

                </div>
            </div>

            {/* preview of features*/}
            <div className = "landing__features">

                {/* articles */}
                <div className = "landing__articles">
                    <div className = "container splitLR">

                        {/* most reacted article */}
                        <div className = "landing__latestRelease">
                            <div className = "landing__latestReleaseContent">
                                <p className = "landing__latestReleaseTitle">
                                    ☕ JOE CODE
                                </p>
                                <p className = "landing__latestReleaseHeadline">
                                    Temp issue headline
                                </p>
                                <p className = "landing__latestReleaseTagline">
                                    <Link to = "/subscribe">
                                        Read the latest issue <ArrowForward style={{marginLeft: ".5rem"}}/>
                                    </Link>
                                </p>
                                <p className = "landing__latestReleaseDate">
                                    {dateNow}
                                </p>
                            </div>
                        </div>

                        {/* top featured */}
                        <div className = "landing__featuredArticles">
                            <h1>Top featured articles</h1>
                            
                            <FeaturedArticle 
                                title = "Hashnode"
                                text = {hashnode.title}
                                link = {`https://${hashnode.author?.publicationDomain === '' ? hashnode.author.blogHandle + '.hashnode.dev/' : hashnode.author?.publicationDomain + '/'}${hashnode.slug}`}
                                author = {hashnode.author?.username}
                                date = {hashnode.dateFeatured}
                                image={hashnode.coverImage}
                            />

                            <FeaturedArticle 
                                title = "Dev.to"
                                text = {dev.title}
                                link =  {dev.url}
                                author = {dev.user?.username}
                                date = {dev.published_timestamp}
                                image = {dev.cover_image}
                            />

                            <FeaturedArticle 
                                title = "Product hunt"
                                text = {product.name}
                                link ={product.url}
                                author  = {product.user?.name}
                                date = {product.featuredAt}
                                image = {product.thumbnail?.url}
                            />
                        </div>

                    </div>
                </div>

            </div>

            {/* footer component*/}
            <Footer/>
        </div>
    )
}

export default Landing
