"use client";
import React, { FormEventHandler, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import IPost from "@interface/IPost";

type Props = {};

const CreatePrompt = (props: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<IPost>({ prompt: "", tag: "" });

  const { data: session } = useSession();
  const router = useRouter();

  const createPrompt: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          id: (session?.user as any).id,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt} />;
};

export default CreatePrompt;
