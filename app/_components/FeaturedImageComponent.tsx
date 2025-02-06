"use client";

import Image from "next/image";
import { useState } from "react";

interface FeaturedImageComponentProps {
  url: string;
  name: string;
  width: number;
  height: number;
  style: {
    [key: string]: string;
  };
}

function FeaturedImageComponent({
  url,
  name,
  width,
  height,
  style,
}: FeaturedImageComponentProps) {
  const [isImageLoading, setImageLoading] = useState(true);

  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`}
      alt={name}
      width={width}
      height={height}
      onLoad={() => setImageLoading(false)}
      className={`transition-all ${isImageLoading ? "blur" : "blur-none"}`}
      style={style}
    />
  );
}

export default FeaturedImageComponent;
