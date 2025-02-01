import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from '../store/postSlice';
import PostCard from '../components/PostCard';

const Home = () => {
  const dispatch = useDispatch();
  
  // Provide a default value of an empty array for `posts`
  const { posts , status, error } = useSelector((state) => state.posts);



  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className='container mx-auto p-4'>
      {status === "loading" && <p>Loading...</p>}
      

      <div className='grid grid-cols-3 gap-4'>
        {posts.length === 0 ? (
          <p>No posts available</p>  
        ) : (
          posts.map((post)=>{
            return(
              <PostCard key={post._id} post={post} />
            )
          }
        ))}
      </div>
    </div>
  );
};

export default Home;
