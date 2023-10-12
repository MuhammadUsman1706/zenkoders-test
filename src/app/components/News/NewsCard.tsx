import { FC } from "react";

interface NewsCardProps {
  news: NewsArticleModel;
  showDetail: React.MouseEventHandler<HTMLAnchorElement>;
}

const NewsCard: FC<NewsCardProps> = ({ news, showDetail }) => {
  return (
    <div className="flex shadow-[rgba(0,0,0,0.24)_0px_3px_8px] rounded-lg p-4 gap-x-4 max-w-[45%] max-[950px]:max-w-[100%] max-[426px]:flex-col gap-y-6">
      <div className="w-[40%] max-[426px]:w-[100%]">
        <img
          className="w-[100%] h-[100%] max-h-[250px] rounded-2xl object-cover"
          src={news.urlToImage}
          alt={news.title}
        />
      </div>
      <div className="w-[60%] max-[426px]:w-[100%] max-[426px]:gap-y-3 max-lg:max-w-[100%] flex flex-col justify-between">
        <h3 className="text-xs font-bold p-2 text-red-500 bg-red-200 w-max rounded-3xl">
          {news?.source?.name}
        </h3>

        <a
          // target="_blank" href={news.url}
          onClick={showDetail}
          className="text-base cursor-pointer font-semibold"
        >
          {news.title}
        </a>

        <div className="flex">
          <img
            className="w-[35px] h-[35px] rounded-full mr-2 object-cover"
            src="/images/author-image.jpg"
            alt={news.author}
          />
          <div>
            <h6 className="text-sm">{news.author}</h6>
            <p className="text-gray-400 text-xs">12 mins ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
