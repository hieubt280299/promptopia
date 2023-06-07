"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import Loading from "@components/Loading";

type Props = {};

const MyProfilePage = (props: Props) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<any>(undefined);
  const [isLoading, setLoading] = useState(true);
  const session: any = useSession().data;
  const router = useRouter();
  const searchParams = useSearchParams();
  const profileId = searchParams.get("id");

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async (id: string) => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };
    const fetchUserInfo = async (id: string) => {
      const response = await fetch(`/api/users/${id}`);
      const data = await response.json();
      setUserInfo(data);
    };

    if (profileId) {
      fetchUserInfo(profileId);
      fetchPosts(profileId);
    } else if (session?.user.id) {
      fetchPosts(session?.user.id);
      setUserInfo(undefined);
    }
  }, [session?.user.id, profileId]);

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

  return isLoading ? (
    <section className="w-full">
      <div className="w-1/2">
        <div className="w-1/2">
          <Loading type="line" title />
        </div>
        <Loading type="line" />
        <Loading type="line" />
      </div>
      <div className="mt-16 prompt_layout">
        <Loading type="card" />
        <Loading type="card" />
      </div>
      {/* <button onClick={() => setLoading(false)}>Button</button> */}
    </section>
  ) : userInfo && profileId !== session?.user.id ? (
    <Profile name={userInfo?.username} desc={`${userInfo?.username}'s prompts for you to copy`} data={posts} />
  ) : (
    <Profile name={"My Profile"} desc={"Your imagination starts here"} data={posts} handleEdit={handleEdit} handleDelete={handleDelete} />
  );
};

export default MyProfilePage;
