import React, { Component, useState } from 'react';
import "static/assets/styles/components/Categories/CategoriesCard.scss"
import { Link } from 'react-router-dom'
function CategoriesCard(props) {
    const [category, setCategories] = useState(props)

    const [color, setColor] = useState(['bg-primary', 'bg-secondary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info'])

    return (

        <Link to={`/classroom/program/${id}/videos/list/${topic.title}`}>
            <div className="p-0 border-0 category-card position-relative rounded">
                <img className="rounded-top" src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_250,dpr_1.0/general_assets/logged_out_homepage/assets/sub_category/whiteboard@2x.jpg" />
                <div className={color[Math.floor(Math.random() * color.length)] + " text-light"}>
                    <span className="font-weight-bold">
                        {category.item.name}
                    </span>
                    <span>
                        Num. teachers {category.item.students}
                    </span>
                </div>
            </div>
        </Link>

    );

}

export default CategoriesCard;