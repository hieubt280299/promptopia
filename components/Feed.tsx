"use client";
import React, { useState, useEffect, ChangeEventHandler } from "react";

import PromptCard from "./PromptCard";
import useDebounce from "@utils/hooks/useDebounce";

type PromptCardListProps = { data: any[]; handleTagClick: (tag: string) => void };
const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const debounceSearchText = useDebounce(searchText, 1000);

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async (searchKey?: string) => {
      if (!searchKey) {
        const response = await fetch("/api/prompt");
        const data = await response.json();

        setPosts(data);
      } else {
        const response = await fetch("/api/prompt", {
          method: "POST",
          body: JSON.stringify({
            searchKey,
          }),
        });
        const data = await response.json();

        setPosts(data);
      }
    };

    fetchPosts(debounceSearchText);
  }, [debounceSearchText]);

  return (
    <section className="feed">
      <form className="relative w-full max-w-2xl flex-center">
        <input
          type="text"
          placeholder="Search for a tag or prompt content"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
