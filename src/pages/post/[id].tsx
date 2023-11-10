import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { NextPage } from "next";
import { PageLayout } from "~/components/layout";

const SinglePostsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <PageLayout>
        <div>Post view</div>
      </PageLayout>
    </>
  );
};

export default SinglePostsPage;
