"use client";
import { FC, Fragment, useState } from "react";
import NewsCard from "./NewsCard";
import NewsDetailModal from "./NewsDetailModal";

interface NewsWrapperProps {
  articles: NewsArticleModel[];
}

const NewsWrapper: FC<NewsWrapperProps> = ({ articles }) => {
  const [showNewsDetailIndex, setShowNewsDetailIndex] = useState<number | null>(
    null
  );

  const setShowNewsDetail = (index: number) => {
    setShowNewsDetailIndex(index);
  };

  return (
    <Fragment>
      {articles.map((singleNews: NewsArticleModel, index) => (
        <NewsCard
          key={singleNews.source.id}
          showDetail={() => setShowNewsDetail(index)}
          news={singleNews}
        />
      ))}

      <NewsDetailModal
        description={articles?.[Number(showNewsDetailIndex)]?.description}
        open={showNewsDetailIndex !== null}
        setOpen={setShowNewsDetail}
      />
    </Fragment>
  );
};

export default NewsWrapper;
