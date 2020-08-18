import React from 'react';
import "static/assets/styles/components/Users/Teachers/TeachersCarousel.scss"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TeachersCard from './TeachersCard'
function CarouselCards() {
    // const [suggestions, setSuggestions] = useState([])
    // useEffect(() => {
    //     fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then(data => {
    //         setSuggestions(data)
    //     })
    // })
    const settings = {
        initialSlide: 0,
        infinite: false,
        speed: 1000,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 4,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 582,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    }

    return (
        <>

            <div className="container mt-5">
                <h3 className="font-weight-normal">Que quieres aprender</h3>

                <div className="overflow-auto filter-carousel border-bottom">
                    <div href="" className="active">Matematicas</div>
                    <div href="">Repaso</div>
                    <div href="">Fisica</div>
                    <div href="">Informatica</div>
                    <div href="">Programación</div>
                    <div href="">Idiomas</div>
                </div>

            </div>
            <div className="container mt-3 rounded">
                <Slider {...settings}>
                    <TeachersCard />
                    <TeachersCard />
                    <TeachersCard />
                    <TeachersCard />
                    <TeachersCard />
                    <TeachersCard />
                    <TeachersCard />
                    <TeachersCard />
                    <TeachersCard />
                </Slider>

            </div>
        </>
    );
}

export default CarouselCards;
