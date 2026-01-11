// components/ArticleCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/Article";
import PrimaryBtn from "../common/PrimaryBtn";
import { Title18, Title14, TitleBase } from "../common/Title";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const { title, description, images, byAdmin, createdAt } = article;

  const mainImage =
    (images && images.length > 0 && images[0]) || "/images/placeholder.png";

  const readableDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 w-full max-w-sm">
      {/* Image Section */}
      <div className="w-full h-48 sm:h-56 lg:h-64 overflow-hidden">
        <Image
          src={mainImage}
          alt={title}
          width={500}
          height={400}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col gap-3 items-start">
        <Title18 className=" line-clamp-1">{title}</Title18>

        <Title14>
          {description.length > 90
            ? description.substring(0, 90) + "..."
            : description}
        </Title14>

        <TitleBase className="text-gray-500">
          By {byAdmin} • {readableDate}
        </TitleBase>
      </div>

      {/* Button Section */}
      <div className="w-full p-4 inline-flex">
        <PrimaryBtn
          text="Read More"
          href="/article/2"
          className="text-center w-full"
        />
      </div>
    </div>
  );
};

export default ArticleCard;
