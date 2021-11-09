import Comments from "./Comments";


export default function Article({ article , title, comments, addComment, name }) {
  return (
    
    <article>
      <div className="article">
        {!article ? (
          <p>No article selected</p>
        ) : (
          <section>
            <div>
              <h2>{article.title}</h2>
              <h3>By: {article.author}</h3>
              <p className="date">{`Posted: ${article.date}`}</p>
              <p className="body">{article.body}</p>
            </div>
          </section>
        )}
      </div>
      <div className="comments">
        {!article ? (
          <p></p>
        ) : (
          <Comments comments={comments} addComment={addComment} arName={title} name={name} />
        )}
      </div>
      
    </article>
  );
}