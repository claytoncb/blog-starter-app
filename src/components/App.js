import { useEffect, useState } from "react";
import Nav from "./Nav";
import Article from "./Article";
import ArticleEntry from "./ArticleEntry";
import { fetchArticles, fetchComments, createArticle, createComment } from "../services/articleService";
import { SignIn, SignOut, useAuthentication } from "../services/authService"
import "./App.css";


export default function App() {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState([]);
  const [writing, setWriting] = useState(null);
  const [articleComments, setArticleComments] = useState([]);
  const user = useAuthentication();
  const [name, setName] = useState("");

  // This is a trivial app, so just fetch all the articles once, when
  // the app is loaded. A real app would do pagination. Note that
  // "fetchArticles" is what gets the articles from the service and
  // then "setArticles" writes them into the React state.

  useEffect(() => {
    setArticleComments([]);
  }, [comments, article]);


  useEffect(() => {
    if (user) fetchArticles().then(setArticles);
    if (user) {
      if (user.displayName) setName(user.displayName);
    }
  }, [user]);

  useEffect(() => {
    if (article != null) {
      if (comments != null) {
        if (Object.keys(articleComments).length === 0) {
          comments.forEach((comment) => {if (comment.arName === article.title) {
            setArticleComments(articleComments => [...articleComments, comment]);
          }})
        }
      }
    }
  });

  useEffect(() => {
    if (user) fetchComments(article).then(setComments);
    if (article != null) {
      if (article.title != null) {
        setTitle(article.title);
      }
    }
  }, [article, user]);
  

  // Update the "database" *then* update the internal React state. These
  // two steps are definitely necessary.
  function addArticle({ title, body, author }) {
    createArticle({ title, body, author }).then((article) => {
      setArticle(article);
      setArticles([article, ...articles]);
    });
    setWriting(false);
  }


  function addComment({ arName, body, name }) {
    createComment({ arName, body, name }).then((comment) => {
      setComments([comment, ...comments]);
    });
  }

  return (
    <div className="App">
      <header>
        Blog
        {user && <button onClick={() => setWriting(true)}>New Article</button>}
        {!user ? <SignIn /> : <SignOut />}
      </header>

      {!user ? "" : <Nav articles={articles} setArticle={setArticle}/>}

      {!user ? (
        <div></div>
      ) : writing ? (
        <ArticleEntry addArticle={addArticle} author={name} />
      ) : (
        <div>
          <Article article={article} title={title} comments={articleComments} addComment={addComment} name={name} />
        </div>
        
      )}
    </div>
  );
}