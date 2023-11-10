import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { LoadingSpinner } from "./loading";
import Image from "next/image";

const CreatePostWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState("");

  const ctx = api.useUtils();

  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.post.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  if (!user) return null;

  return (
    <div className="flex w-full grow gap-4">
      <Image
        src={user.imageUrl}
        alt="Profile image"
        className="h-12 w-12 rounded-full"
        height={48}
        width={48}
      />
      <input
        placeholder="Type some emojis"
        className="roud grow rounded-md bg-slate-800 bg-transparent px-4 outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
        disabled={isPosting}
      />
      {input !== "" && (
        <button onClick={() => mutate({ content: input })} disabled={isPosting}>
          Post
        </button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex border-b border-slate-400 p-4">
      {!isSignedIn && (
        <div className="flex justify-center">
          <SignInButton />
        </div>
      )}
      {!!isSignedIn && (
        <div className="flex grow items-center justify-center gap-4">
          <CreatePostWizard />
          <div className="whitespace-nowrap">
            <SignOutButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
