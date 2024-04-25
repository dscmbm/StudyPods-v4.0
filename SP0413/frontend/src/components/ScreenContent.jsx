import { useState, useEffect } from "react";
import "./ScreenContent.css";

const ScreenContent = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=ce2bee6e7a48494fba89a3a6bd51bf89"
        );
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container">
      <h1 className="borderZero">Popular</h1>
      <h3 className="borderZero">Article</h3>
      <div className="row">
        {news.map((article, index) => (
          <div className="block" key={index}>
            <img
              src={article.urlToImage}
              alt={article.title}
              className="article-poster"
            />
            <h3>{article.title}</h3>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenContent;
