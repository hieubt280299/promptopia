"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

type Props = {};

const MyProfilePage = (props: Props) => {
  const session: any = useSession().data;
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);
  const handleEdit = (post: any) => {
    router.push(`/edit-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });

        setPosts((prev) => prev.filter((p) => p._id !== post._id));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return <Profile name="My Profile" desc="Welcome to my profile" data={posts} handleEdit={handleEdit} handleDelete={handleDelete} />;
};

export default MyProfilePage;
