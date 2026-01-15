export interface ArticleImage {
  public_id: string;
  url: string;
  _id?: string;
}

export interface Article {
  _id: string;
  title: string;
  description: string;
  slug: string;
  cover_image: ArticleImage;
  images: ArticleImage[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
