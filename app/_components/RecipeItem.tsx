import { BASE_URL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

type Recipe = {
  name: string;
  documentId: string;
  image: {
    url: string;
  };
};

function RecipeItem({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      className="flex flex-col gap-2 group"
      href={`/recipe/${recipe.documentId}`}
    >
      <div className="aspect-[3/4] relative rounded-3xl overflow-hidden border border-red-200">
        <Image
          fill
          className="object-cover group-hover:scale-105 transition-transform"
          src={`${BASE_URL}${recipe.image.url}`}
          alt={recipe.name}
        />
      </div>
      <p className="text-sm px-4 font-medium group-hover:text-slate-700 transition-colors">
        {recipe.name}
      </p>
    </Link>
  );
}

export default RecipeItem;
