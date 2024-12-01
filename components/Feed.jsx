'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        post.creator ? ( // Check if creator exists
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
          
        ) : (
          console.warn('Post missing creator:', post) // Log problematic post
        )
      ))}
    </div>
  );
};

// const PromptCardListWrapper = ({ isSignedIn, data, handleTagClick }) => {
//   return (
//     <div>
//       {isSignedIn ? (
//         <PromptCardList data={data} handleTagClick={handleTagClick} />
//       ) : (
//         <p>Please sign in to view prompts.</p> // Message or alternative content
//       )}
//     </div>
//   );
// };


const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [posts, setPosts] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    // Debounce search
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt');
        const data = await response.json();

        // Filter out invalid posts
        const validPosts = data.filter(post => post.creator && post.creator.username);
        setPosts(validPosts);
        console.log('Valid Fetched Posts:', validPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]); // Fallback to an empty array
      }
    };

    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i'); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        (item.creator && regex.test(item.creator.username)) || // Check if creator exists
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleTagClick = (tagName) => {
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or Username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      
      <PromptCardList
        data={searchText ? searchedResults || [] : posts || []} // Ensure data defaults to an array
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
