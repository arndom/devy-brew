import React from 'react'

function FeaturedArticle({title, text, link, author, date, image}) {

    const _date = new Date(date).toLocaleDateString()

    return (
        <div className = "featuredArticle">
            <a href = {link? link : "#"} target = "_blank"  rel="noreferrer" >
                <div className = "featuredArticle__left">
                    <h4>{title}</h4>
                    <p className = "featuredArticle__leftText" >{text}</p>
                    <p className = "featuredArticle__leftInfo">{author} | {_date} </p>
                </div>

                <div className = "featuredArticle__right">
                    <img src = {image?  image : 'https://picsum.photos/200' } alt ="cover"/>
                </div>
            </a>
        </div>
    )
} 

export default FeaturedArticle