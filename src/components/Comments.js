import "./App.css";
import { useState } from "react";
export default function Comments({comments, addComment, arName, name}) {

    const [body, setBody] = useState("");
    const [error, setError] = useState(null);
  
    function submit(e) {
      setError(null);
      e.preventDefault();
      if (!body.trim()) {
        setError("Both the title and body must be supplied");
      } else {
        addComment({ arName, body, name });
        setBody("");
      }
    }

    return(
        <div>
          <form onSubmit={submit}>
            {error && <p className="error">{error}</p>}
            Add Comment
            <textarea
              className="form"
              rows="2"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <button type="submit" >Create</button>
          </form>
          <div>Comment Section</div>
          <nav>
            {!comments
              ? "No comments"
              : comments.map((com) => (
                <p key={com.date} >
                    {com.name}
                    {" :  "}{com.body}
                    </p>
                ))}
          </nav>
        </div>
    )
}
          