import { useState, useEffect } from 'react';

import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';

import { ProfileCircle, MessageText1 } from 'iconsax-react';

import { BsBookmarkPlus, BsFillBookmarkFill } from 'react-icons/bs';

import ReactTimeAgo from 'react-time-ago';

import {
  useCreateBookmarkMutation,
  useLikePostMutation,
  useDeleteBookmarkMutation,
} from '../../../../app/slices/apiSlices/contentsSlice';

import { useSelector } from 'react-redux';

import VerifyEmailPopUp from '../../components/verifyEmailPopUp';

export default function Postcard({ post, isBookmarked }) {
  const [latestPost, setLatestPost] = useState(post);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [bookmarked, setBookmarked] = useState(
    isBookmarked || post?.isBookmarked
  );

  const [queryError, setQueryError] = useState();

  const { user } = useSelector((state) => state?.user);

  const navigate = useNavigate();

  const location = useLocation();

  const [likePost, { data, isLoading, isSuccess, isError, error }] =
    useLikePostMutation();

  const [
    createBookmark,
    {
      data: createBookData,
      isSuccess: createBookIsSuccess,
      isLoading: createBookIsLoading,
      isError: createBookIsError,
      error: createBookError,
    },
  ] = useCreateBookmarkMutation();

  const [
    deleteBookmark,
    {
      data: deleteBookData,
      isLoading: deleteBookIsLoading,
      isSuccess: deleteBookIsSuccess,
      isError: deleteBookIsError,
      error: deleteBookError,
    },
  ] = useDeleteBookmarkMutation();

  const handleCreateBookmark = () => {
    createBookmark({
      postId: post?._id,
      postType: 'Post',
    });
  };

  const handleDeleteBookmark = () => {
    deleteBookmark(post._id);
  };

  const handleLikePost = () => {
    likePost(post._id);
  };

  useEffect(() => {
    if (isSuccess) {
      setLatestPost(data?.data);
      setLikeAnimation(true);

      setTimeout(() => {
        setLikeAnimation(false);
      }, 1100);
    }
    if (isError) {
      setQueryError(error?.data.message);
    }
  }, [isSuccess, isError, data]);

  useEffect(() => {
    if (post && !isBookmarked) {
      setBookmarked(post?.isBookmarked);
    } else if (isBookmarked) {
      setBookmarked(isBookmarked);
    }
  }, [post, isBookmarked]);

  return (
    <>
      {/* verifyEmailPopUp */}
      <VerifyEmailPopUp queryError={queryError} setQueryError={setQueryError} />
      <div
        className={`decoration-none p-6 shadow-[0px_3.31218px_19.8731px_rgba(86,_86,_86,_0.15)] 
        ${
          location.pathname.includes('bookmarks')
            ? 'border-b border-b-neutral-400 px-0 py-4 shadow-none transition-all duration-150 ease-in-out hover:bg-gray-300/25 '
            : ''
        }
        `}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-2">
            <Link
              to={
                user?._id === post?.author?._id
                  ? `/dashboard/account`
                  : `/dashboard/users/${post?.author?._id}`
              }
              className="h-10 w-10 overflow-hidden rounded-full"
            >
              {post?.author?.profilePicture ? (
                <img
                  src={post?.author?.profilePicture}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <ProfileCircle
                  size={45}
                  color="#555555"
                  className="h-full w-full object-cover"
                />
              )}
            </Link>
            <div className="flex flex-col">
              <Link
                to={
                  user?._id === post?.author?._id
                    ? `/dashboard/account`
                    : `/dashboard/users/${post?.author?._id}`
                }
                className="font-semibold text-neutral-900 "
              >
                {post?.author?.firstName} {post?.author?.lastName}
              </Link>
              <div className="text-[0.8rem] text-neutral-600">
                {post?.createdAt && (
                  <ReactTimeAgo date={post?.createdAt} locale="en-US" />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3.5  font-medium text-neutral-900">
            <Link to={`/dashboard/feed/post/${post?._id}`}>
              <p>{post?.content}</p>
            </Link>
            <div
              className={`flex h-full max-h-[20rem] w-full items-center justify-between gap-2 overflow-hidden
           
            `}
            >
              {post?.media.map((media, index) => (
                <Link
                  to={`/dashboard/feed/post/${post?._id}/images/${index + 1}`}
                  className={`aspect-video h-full w-full  overflow-hidden`}
                  state={{
                    media: media.url,
                  }}
                  key={index}
                >
                  <img
                    src={media.url}
                    alt={`Post media`}
                    className={`h-full max-h-[20rem] w-full object-cover`}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-[0.8rem] ">
              <div className="flex items-center gap-[0.3rem] font-medium text-neutral-600 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={
                    post?.upvotedBy?.includes(user?._id) ? 'red' : '#FFFFFF'
                  }
                  onClick={handleLikePost}
                  className={`cursor-pointer ${
                    likeAnimation && 'animate-like'
                  }`}
                >
                  <path
                    d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
                    stroke={
                      post?.upvotedBy?.includes(user?._id) ? 'red' : '#343A40'
                    }
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div
                  className={`${likeAnimation && 'animate-like'}`}
                  style={{
                    color: post?.upvotedBy?.includes(user?._id)
                      ? 'red'
                      : '#343A40',
                  }}
                >
                  {post?.upvotedBy?.length}
                </div>
              </div>
              <div className="w-[1px] bg-neutral-600 "></div>
              <div className="flex items-center gap-[0.3rem] font-medium text-neutral-600 ">
                <MessageText1
                  size={20}
                  color="#555555"
                  className="cursor-pointer"
                />
                <div className="">{post?.comments?.length}</div>
              </div>
            </div>
            <div className="">
              <div className="w-fit">
                {!bookmarked ? (
                  <BsBookmarkPlus
                    size={17}
                    color="#555555"
                    className="cursor-pointer"
                    onClick={handleCreateBookmark}
                  />
                ) : (
                  <BsFillBookmarkFill
                    size={20}
                    className="cursor-pointer"
                    onClick={handleDeleteBookmark}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
