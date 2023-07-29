import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import forumService from '../services/forumService';

const ForumView = () => {
  const { id } = useParams();
  const [forum, setForum] = useState(null);

  useEffect(() => {
    const fetchForum = async () => {
      try {
        const fetchedForum = await forumService.getForum(id);
        setForum(fetchedForum);
      } catch (error) {
        console.error('Failed to fetch forum:', error);
      }
    };

    fetchForum();
  }, [id]);

  if (!forum) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{forum.title}</h2>
      <p>{forum.description}</p>
      <div>
        {forum.threads.map((thread) => (
          <div key={thread.id}>
            <h3>{thread.title}</h3>
            <p>{thread.content}</p>
            <p>Posted by {thread.author.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumView;