import React, {
    Component,
    useState,
    useEffect
} from 'react';
import "static/assets/styles/components/Categories/MainCategories.scss"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoriesCard from './CategoriesCard'
import Button from 'react-bootstrap/Button';

function MainCategories() {
    const [categories, setCategories] = useState(
        {
            category: {
                name: 'idiomas',
                subcategories: [
                    {
                        id: 0,
                        name: 'Profesores de inglés online',
                        students: 234
                    },
                    {
                        id: 1,
                        name: 'Profesores de inglés online',
                        students: 234
                    },
                    {
                        id: 2,
                        name: 'Profesores de inglés online',
                        students: 234
                    },
                    {
                        id: 3,
                        name: 'Profesores de inglés online',
                        students: 234
                    },
                    {
                        id: 4,
                        name: 'Profesores de inglés online',
                        students: 234
                    },
                    {
                        id: 5,
                        name: 'Profesores de inglés online',
                        students: 234
                    },
                ]
            }
        }
    );

    return (
        <>

            <div className="container pt-5 pb-5 ">
                <div className="border-bottom pb-3">
                    <h3 className="text-center font-weight-normal">Categorias Populares</h3>
                    <div className="div-btn-categories">
                        <Button variant="outline-primary" className="btn-categories btn-lg">Idiomas</Button>
                        <Button variant="outline-secondary" className="btn-categories btn-lg">Repaso</Button>
                        <Button variant="outline-danger" className="btn-categories btn-lg">Música</Button>
                        <Button variant="outline-warning" className="btn-categories btn-lg">Tecnología</Button>
                    </div>
                </div>


                <div className="main-categories mt-3">
                    {categories.category.subcategories.map((item) => <CategoriesCard item={item} />)}
                </div>
            </div>

        </>
    );
}

export default MainCategories;
