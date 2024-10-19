// src/components/CarouselSection.js
import React from 'react';
import { Carousel } from 'antd';
import './StylesComponent/CarouselSection.css';  // Import CSS

const CarouselSection = () => {
    return (
        <Carousel autoplay arrows className="carousel" dots={true}>
            <div>
                <img
                    src="https://files.betacorp.vn/media/images/2024/10/10/le-hoi-doi-ma-1702-x-621-170901-101024-19.png"
                    alt="Banner 1"
                />
            </div>
            <div>
                <img
                    src="https://files.betacorp.vn/media/images/2024/10/18/1702x621-21-153244-181024-76.jpg"
                    alt="Banner 2"
                />
            </div>
            <div>
                <img
                    src="https://files.betacorp.vn/media/images/2024/10/03/phim-hay-t10-1702x621-165619-031024-42.png"
                    alt="Banner 3"
                />
            </div>
        </Carousel>
    );
};

export default CarouselSection;
