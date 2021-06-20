import { Button} from '@material-ui/core'
import { MailOutlined } from '@material-ui/icons'
import React from 'react'
import FeaturedArticle from '../components/FeaturedArticle'

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
                        flex: 0,
                    }}>
                       <MailOutlined/> Subscribe
                    </Button>

                </div>

                {/*image*/}
                <div 
                    className = "landing__bannerRight"
                >
                    
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
                    <div className = "landing__featuredArticles" style={{display:"flex", flexDirection:"column", justifyContent: "space-between"}}>
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
                <div className = "splitLR landing__funPreview">
                    {/* jokes */}
                    <div>

                    </div>
                    {/* games */}
                    <div>

                    </div>
                </div>

            </div>

            
            {/* call to action */}
            <div className = "splitLR landing__call2Action">
                <div>

                </div>
                <div>

                </div>
            </div>

            {/* footer component*/}
        </div>
    )
}

export default Landing
