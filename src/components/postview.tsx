import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { RouterOutputs } from "~/utils/api";

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["post"]["getALL"][number];

export const PostView = (props: PostWithUser) => {
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
