import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// material-ui components
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import GridContainer from "../react-kit/components/Grid/GridContainer.jsx";
import GridItem from "../react-kit/components/Grid/GridItem.jsx";
import Card from "../react-kit/components/Card/Card.jsx";

import image1 from "../react-kit/assets/img/bg.jpg";
import image2 from "../react-kit/assets/img/bg2.jpg";
import image3 from "../react-kit/assets/img/bg3.jpg";
import "../react-kit/assets/scss/material-kit-react.scss"

import bimg1 from '../olive_bakery_img_etc/식빵.jpg';
import bimg2 from '../olive_bakery_img_etc/단팥빵.jpg';
import bimg3 from '../olive_bakery_img_etc/마늘빵.jpg';
import bimg4 from '../olive_bakery_img_etc/소보로빵.JPG';



import axios from "axios";

class SectionCarousel extends React.Component {
    state= {
        imgs: []
    };
    componentDidMount() {
        this.getBread();
    }
    getBread = () => {
        axios.get(`http://15.164.57.47:8080/olive/bread`
        ).then(response => {
            //this.props.onReceive(response.data.number);
            if(response.status===200) {
                console.log('알림창 추가하자');
                this.setState({
                    imgs: response.data.map(bread => ({name: bread.name, url: bread.imageUrl}))
                });
            }
        });
    };
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true
        };
        let i = 0;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <Carousel {...settings}>
                            {
                                this.state.imgs.map((img,key) => (
                                    <div key={key}>
                                        <img
                                            src={img}
                                            alt="First slide"
                                            className="slick-image"
                                        />
                                        <div className="slick-caption">
                                            <h4>
                                                <LocationOn className="slick-icons" />{img.name}
                                            </h4>
                                        </div>
                                    </div>
                                ))
                            }
                        </Carousel>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

export default SectionCarousel;
