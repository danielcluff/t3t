import Head from "next/head";
import Image from "next/image";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { RouterOutputs, api } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { LoadingPage, LoadingSpinner } from "~/components/loading";
import { FormEventHandler, useState } from "react";
import toast from "react-hot-toast";
import { NextPage } from "next";
import Link from "next/link";
import { PageLayout } from "~/components/layout";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["post"]["getALL"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div key={post.id} className="flex border-b border-slate-400 p-4">
      <Link href={`/@${author.username}`}>
        <Image
          src={author.imageUrl}
          alt="Author profile image"
          className="h-14 w-14 rounded-full"
          height={56}
          width={56}
        />
      </Link>
      <div className="flex flex-col">
        <div className="flex gap-2 font-bold text-slate-300">
          <Link href={`/@${author.username}`}>
            <span>{`@${author.username}`}</span>
          </Link>
          •
          <Link href={`/post/${post.id}`}>
            <span className="font-thin">{dayjs(post.createdAt).fromNow()}</span>
          </Link>
        </div>
        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.post.getALL.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {data?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  api.post.getALL.useQuery();

  if (!userLoaded) return <div />;

  return (
    <>
      <PageLayout>
        <Feed />
      </PageLayout>
    </>
  );
};

export default Home;
