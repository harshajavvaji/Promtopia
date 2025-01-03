"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

  const [copied, setCopied] = useState("")
  const { data: session} = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopied = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(""), 3000)
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          {/* Conditional check for post.creator and post.creator.image */}
          {post.creator && post.creator.image ? (
            <>
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain" />
              
              <div className="flex flex-col">
                <h3 className="font-sathoshi font-semibold text-gray-900">
                  {post.creator.username}
                </h3>
                <p className="font-inter text-sm
                text-gray-500">
                  {post.creator.email}
                </p>
              </div>
              </>
          ) : (
            <Image
              src="/fallback-image.png" // Use a fallback image if creator or image is missing
              alt="default_user_image"
              width={40}
              height={40}
              
            />
          )}
        </div>
        <div className="copy_btn" 
        onClick={handleCopied}
        >
        <Image 
          src={copied === post.prompt
            ? 'assets/icons/tick.svg'
            : 'assets/icons/copy.svg'}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-sathoshi text-sm text-gray-700"
      >
        {post.prompt}
      </p>
      <p className="font-inter blue_gradient text-sm cursor-pointer"
      onClick={() => handleTagClick && handleTagClick 
        (post.tag)}
      >
        {post.tag}
      </p>
      {session?.user?.id === post?.creator?._id && pathName === '/profile' && (
        <div className="flex-center mt-5 text-sm gap-4 border-t border-gray-100 pt-3">
          <p className="text-inter text-sm blue_gradient cursor-pointer"
          onClick={handleEdit}
          >
            Edit
          </p>
          <p className="text-inter text-sm  orange_gradient cursor-pointer"
          onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}

    </div>
  );
};

export default PromptCard;
