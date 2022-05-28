import ListItem from "../listitem/Listitem";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function List({ list }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="list">
        <span className="listTitle">
          <img src="img/cinema.jpg" className="cinemaPng" alt="none" />
          {list.title}
        </span>
        <div className="wrapper">
          <div className="listItemShow">
            <Slider {...settings}>
              {list.content.map((item, i) => (
                <div className="itemPlace" key={i}>
                  <ListItem item={item} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
