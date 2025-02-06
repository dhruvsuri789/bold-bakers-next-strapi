"use client";

import { cn } from "@/utils/utilities";
import Image from "next/image";
import { useState } from "react";

interface RecipeImageComponentProps {
  url: string;
  name: string;
  sizes?: string;
  priority?: boolean;
  cl?: string;
}

function RecipeImageComponent({
  url,
  name,
  sizes,
  priority,
  cl,
}: RecipeImageComponentProps) {
  const [isImageLoading, setImageLoading] = useState(true);

  return (
    <Image
      fill
      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`}
      sizes={sizes}
      alt={name}
      onLoad={() => setImageLoading(false)}
      className={cn(
        `object-cover transition-all ${isImageLoading ? "blur" : "blur-none"}`,
        cl
      )}
      priority={priority}
    />
  );
}

export default RecipeImageComponent;
