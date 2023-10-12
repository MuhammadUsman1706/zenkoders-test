import axios from "axios";
import { FC } from "react";
import NewsWrapper from "../components/News/NewsWrapper";

const getNews = async () => {
  const result = await axios.get(
    "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=e5264878b31d457cbaa202600f254786&pageSize=6&page=1"
  );

  return result.data;
};

const NewsPage: FC = async () => {
  const news = await getNews();

  return (
    <article>
      <header className="mb-14">
        <h1 className="text-center mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Hey there! Fellow News Reader!
        </h1>
        <h2 className="text-center text-xl mt-4">
          Read the latest news from BBC!
        </h2>
      </header>
      <main className="flex flex-wrap gap-6 mx-auto max-w-[95%]">
        <NewsWrapper articles={news.articles} />
      </main>
    </article>
  );
};

export const revalidate = 10;
export default NewsPage;
