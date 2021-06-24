import { Button} from '@material-ui/core'
import { ArrowForward, CropSquare, MailOutlined} from '@material-ui/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import FeaturedArticle from '../components/FeaturedArticle'
import Footer from '../components/Footer'
import * as ROUTES from "../constants/routes"

const producthuntKey =  process.env.REACT_APP_PRODUCTHUNT_KEY;
const rapidApiKey = process.env.REACT_APP_RAPID_KEY;

const geekJokes = "https://geek-jokes.p.rapidapi.com/api?format=json";
// const ninJokes = "https://jokes-by-api-ninjas.p.rapidapi.com/v1/jokes";

function Landing() {

    const history = useHistory();

    const [dev, setDev] = useState({});
    const [hashnode, setHashnode] = useState({});
    const [product, setProduct] = useState({});
    const [joke, setJoke] =  useState("");
    const dateNow = new Date().toLocaleDateString() 

    async function fetchDev(){
        const response = await axios.get("https://dev.to/api/articles")
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
        // console.log(response.data.data.storiesFeed[0])
        setHashnode(response.data.data.storiesFeed[0])
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

    async function fetchJokes(){
        // var chosenJokeURL = Math.random() < 0.5 ? geekJokes : ninJokes;

        const response = await axios.get(geekJokes,{
            headers:{
                'x-rapidapi-key': rapidApiKey,
                'x-rapidapi-host': "geek-jokes.p.rapidapi.com",
            }
        })
        // console.log(response.data.joke)
        setJoke(response.data.joke)
    }

    useEffect(()=>{
        fetchDev()
        fetchHashnode()
        fetchProduct()
        fetchJokes()
    },[])

    return (
        <div className = "landing">

            {/* banner */}
            <div className = "landing__banner">
                <div className = "container splitLR">
                    
                    {/* text */}
                    <div className = "landing__bannerLeft">
                        <div className = "landing__bannerLeftText">
                            <h1>Devy brew ☕</h1>
                            <p>Get daily mails curated with articles from the most popular dev plattforms, fun games and geeky jokes. Make us part of your daily routine to stay informed and entertained.</p>
                        </div>
                        <Button 
                            style={{
                                color: "white",
                                background: "linear-gradient(to right, #232526, #414345)",
                                // background: "linear-gradient(to right, #514A9D, #24C6DC)",
                                textTransform: "none",
                                width: "8rem"
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
                                    ☕ JOE CODEnp 
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
                                text = {`${product.name}: ${product.tagline}`}
                                link ={product.url}
                                author  = {product.user?.name}
                                date = {product.featuredAt}
                                image = {product.thumbnail?.url}
                            />
                        </div>

                    </div>
                </div>

                {/* jokes / games */}
                <div className = "landing__fun">

                    <div className = "container splitLR">
                        {/* jokes */}
                        <div className = "landing__funJokes">
                            <p style={{
                                fontFamily: "Pacifico",
                                fontSize: "2rem"
                            }}>
                                Jokes
                            </p>
                            <div className = "landing__funJokesContent">
                                <p><b>"</b> {joke} <b>"</b></p>

                                <Button
                                    style={{
                                        color: "white",
                                        background: "linear-gradient(to right, #514A9D, #24C6DC)",
                                        flex: 0,
                                        textTransform: "none",
                                        marginTop: "10px"
                                    }}
                                    onClick={()=>fetchJokes()}
                                >
                                    More 
                                </Button>                                
                            </div>



                        </div>
                        
                        {/* games */}
                        <div className = "landing__funGames">
                            
                        </div>
                    </div>

                </div>

            </div>
        
            {/* call to action */}
            <div className = "landing__call2Action">
                <div className = "splitLR container">
                    
                    <div className =  "landing__call2ActionLeft">
                        <h1>What our paper offers</h1>

                        <p><CropSquare/> Featured articles from platforms:</p>
                            <ul>
                                <li>Hashnode</li>
                                <li>Dev.to</li>
                                <li>Producthunt</li>
                                <li>and more to come soon...</li>
                            </ul>
                        <p><CropSquare/> Games: crosswords and word search</p>
                        <p><CropSquare/> Jokes</p>
                    </div>

                    <div className = "landing__call2ActionRight">
                        <div className = "landing__call2ActionRightTop">
                            <p>Devy Brew</p>
                        </div>

                        <div className = "landing__call2ActionRightBottom">
                            <Button 
                                style={{
                                    color: "white",
                                    background: "linear-gradient(to right, #514A9D, #24C6DC)",
                                    // flex: 0,
                                    textTransform: "none",
                                    fontFamily: "Pacifico"
                                }}
                                onClick = {()=>history.push(ROUTES.SUBSCRIBE.INDEX)}
                            >
                                <MailOutlined style={{paddingRight: "5px"}}/>Give it a try
                            </Button>
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
