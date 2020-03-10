import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyImage = props => {
  return (
    <LazyLoadImage
      alt={props.alt}
      src={props.image} // use normal <img> attributes as props
      effect="blur"
      className={props.className}
    />
  );
};

export default LazyImage;
