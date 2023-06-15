import { useState, useEffect } from 'react'

import postCommentStyles from './postcomment.module.css'

import { Link } from 'react-router-dom'

import { ArchiveAdd, ProfileCircle } from 'iconsax-react'

import ReactTimeAgo from 'react-time-ago'

import { useSelector } from 'react-redux'

import { useLikeCommentMutation } from '../../../../../../app/slices/apiSlices/feedSlice'

export default function Postcomment ({ comment }) {
  // const [latestComment, setLatestComment] = useState(comment)

  const [likeAnimation, setLikeAnimation] = useState(false)

  const { user } = useSelector(state => state?.user?.user)

  const [
    likeComment,
    {
      data: likeCommentData,
      isLoading: likeCommentIsLoading,
      isSuccess: likeCommentIsSuccess,
      isError: likeCommentIsError,
      error: likeCommentError
    }
  ] = useLikeCommentMutation()

  const handleLikeComment = () => {
    likeComment(comment?._id)
  }

  useEffect(() => {
    if (likeCommentIsSuccess) {
      // setLatestComment(likeCommentData?.data)
      setLikeAnimation(true)

      setTimeout(() => {
        setLikeAnimation(false)
      }, 1000)
    }
  }, [likeCommentIsSuccess])

  return (
    <div className={postCommentStyles.container}>
      <div className={postCommentStyles.header}>
        <Link
          to={
            comment?.author?._id === user?._id
              ? `/dashboard/account`
              : `/dashboard/users/${comment?.author._id}`
          }
          className={postCommentStyles.avatar}
        >
          {comment?.author?.profilePicture ? (
            <img
              src={comment?.author?.profilePicture}
              alt=''
              className={postCommentStyles.img}
            />
          ) : (
            <ProfileCircle
              size={45}
              color='#555555'
              className={postCommentStyles.iconAvatar}
            />
          )}
        </Link>
        <div className={postCommentStyles.info}>
          <Link
            to={
              comment?.author?._id === user?._id
                ? `/dashboard/account`
                : `/dashboard/users/${comment?.author._id}`
            }
            className={postCommentStyles.name}
          >
            {comment?.author.firstName} {comment?.author.lastName}
          </Link>
          <div className={postCommentStyles.timePosted}>
            {<ReactTimeAgo date={comment?.createdAt} locale='en-US' />}
          </div>
        </div>
      </div>

      <div className={postCommentStyles.body}>
        <div className={postCommentStyles.text}>
          <p>{comment?.content}</p>
        </div>
        {/* <div className={postCommentStyles.media}>
                <img src={postMedia} alt='' className='' />
              </div> */}
      </div>

      <div className={postCommentStyles.icons}>
        <div className={postCommentStyles.left}>
          <div className={postCommentStyles.like}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill={comment?.upvotedBy?.includes(user?._id) ? 'red' : '#FFFFFF'}
              onClick={handleLikeComment}
              className={`${postCommentStyles.icon} ${
                likeAnimation && postCommentStyles.likeAnimation
              }`}
            >
              <path
                d='M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z'
                stroke={
                  comment?.upvotedBy?.includes(user?._id) ? 'red' : '#343A40'
                }
                strokeWidth='1'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
            </svg>
            <div
              className={`${postCommentStyles.count} ${
                likeAnimation && postCommentStyles.likeAnimation
              }`}
              style={{
                color: comment?.upvotedBy?.includes(user?._id)
                  ? 'red'
                  : '#343A40'
              }}
            >
              {comment?.upvotes}
            </div>
          </div>
          <div className={postCommentStyles.divider}></div>

          <div className={postCommentStyles.bookmark}>
            <ArchiveAdd
              size={20}
              color='#555555'
              className={postCommentStyles.icon}
            />
          </div>
        </div>
        {/* <div className={postCommentStyles.right}>
              <div className={postCommentStyles.bookmark}>
                <ArchiveAdd
                  size={20}
                  color='#555555'
                  className={postCommentStyles.icon}
                />
              </div>
            </div> */}
      </div>
    </div>
  )
}