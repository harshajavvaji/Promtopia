'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [posts, setPosts] = useState([]);
  const [searchedResults, setSearchedResults] = useState(null);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    console.log(e.target.value)
    setSearchText(e.target.value)

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult  = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      },500)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        
        // Log the fetched data to verify the number of posts
        console.log('Fetched Posts:', data);
        
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
  const handleTagClick = (tagName) => {
    setSearchedResults(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or Username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {searchText? (
        <PromptCardList 
        data={searchedResults}
        handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList
        data={posts}
        handleTagClick={() => {}}
      />
      )
    }
      
    </section>
  );
};

export default Feed;