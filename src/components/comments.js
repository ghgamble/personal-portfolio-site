import React from 'react';

const Comments = ({ post }) => {
  const comments = post.comments.nodes;
  console.log(comments);
  let header = ``;
  if (comments.length === 1) {
    header = `Comment`;
  } else if (comments.length > 1) {
    header = `Comments`;
  }
  return (
    <div className="comments">
        <h2>{header}</h2>
        {comments.map(comment => (
          <div className="comment" id={comment.id}>
            <p dangerouslySetInnerHTML={{ __html: comment.content }} />
            <p className="meta">
              From {comment.author.node.name} on {comment.date}
            </p>
          </div>
        ))}
    </div>
  );
}

export default Comments;
