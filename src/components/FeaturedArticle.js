import React from 'react'

function FeaturedArticle({title, text, image}) {
    return (
        <div className = "featuredArticle">
            <div className = "featuredArticle__left">
                <h4 style ={{}}>{title}</h4>
                <p>{text}</p>
            </div>

            <div className = "featuredArticle__right">

            </div>
        </div>
    )
}

export default FeaturedArticle