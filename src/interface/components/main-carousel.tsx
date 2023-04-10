import React from 'react';
import {Carousel} from "antd";
import {images} from "@/libs/data/images";


const MainCarousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3.5,
        autoplay: false,
        draggable: true,
        initialSlide: -0.5,
    }
    
    return (
        // <div className={'flex flex-row gap-3'}>
        <Carousel {...settings} className={'cursor-pointer'}>
            {images.map(item =>
                <div key={`img-${item}`}>
                    <img src={item} className={'rounded-2xl'} alt=''/>
                </div>
            )}
        </Carousel>
        // </div>
    );
};

export default MainCarousel;