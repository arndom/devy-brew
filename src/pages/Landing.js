import { Button} from '@material-ui/core'
import { CropSquare, MailOutlined } from '@material-ui/icons'
import React from 'react'
import FeaturedArticle from '../components/FeaturedArticle'
import Footer from '../components/Footer'

function Landing() {
    return (
        <div className = "landing">

            {/* banner */}
            <div className = "landing__banner">
                <div className = "container splitLR">
                    
                    {/* text */}
                    <div className = "landing__bannerLeft">
                        <div>
                            <h1>Devy brew</h1>
                            <p>some nice wordings...</p>
                        </div>
                        <Button style={{
                            color: "white",
                            background: "linear-gradient(to right, #232526, #414345)",
                            // flex: 0,
                            textTransform: "none"
                        }}>
                        <MailOutlined/> Subscribe
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
                        <div className = "landing__topArticle">
                            <div className = "landing__topArticleContent">
                        
                            </div>
                        </div>

                        {/* top featured */}
                        <div className = "landing__featuredArticles">
                            <h1>Top featured articles</h1>

                            <FeaturedArticle 
                                title = "hashnode"
                                text = "this is some nice article"
                            />

                            <FeaturedArticle 
                                title = "dev.to"
                                text = "this is another nice article"
                            />

                            <FeaturedArticle 
                                title = "product hunt"
                                text = "this is some nice product"
                            />
                        </div>

                    </div>
                </div>

                {/* jokes / games */}
                <div className = "landing__fun">

                    <div className = "container splitLR">
                        {/* jokes */}
                        <div className = "landing__funJokes">
                            <div className = "landing__funJokesContent">

                            </div>

                            <Button style={{
                                color: "white",
                                background: "linear-gradient(to right, #232526, #414345)",
                                flex: 0,
                                textTransform: "none"
                            }}>
                                more jokes
                            </Button>

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
                        <h1>What we Offer</h1>

                        <p><CropSquare/> featured articles from platforms:</p>
                            <ul>
                                <li>hashnode</li>
                                <li>dev.to</li>
                                <li>producthunt</li>
                                <li>and more to come soon...</li>
                            </ul>
                        <p><CropSquare/> games section with crosswords and word search</p>
                        <p><CropSquare/> comic strip / jokes section</p>
                    </div>

                    <div className = "landing__call2ActionRight">
                        <div className = "landing__call2ActionRightTop">
                            <p>nice tagline</p>
                            <p>with</p>
                            <p>a fitting background</p>
                        </div>

                        <div className = "landing__call2ActionRightBottom">
                            <Button style={{
                                color: "white",
                                background: "linear-gradient(to right, #232526, #414345)",
                                // flex: 0,
                                textTransform: "none"
                            }}>
                                <MailOutlined/> Try it
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
