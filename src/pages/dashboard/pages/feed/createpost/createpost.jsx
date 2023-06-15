import { useState, useRef, useEffect } from 'react'

import createPostStyles from './createpost.module.css'

import { useNavigate } from 'react-router-dom'

import { LuShare } from 'react-icons/lu'

import { ArrowRotateLeft, ProfileCircle } from 'iconsax-react'

import { useImageHandler } from '../../account/hooks/useImageHandler'

import { useCreatePostMutation } from '../../../../../app/slices/apiSlices/feedSlice'

import { useSelector } from 'react-redux'

export default function Createpost ({ setToggleCreatePost }) {
  const [content, setContent] = useState(false)

  const { user } = useSelector(state => state?.user?.user)

  const chooseref = useRef(null)
  const dropRef = useRef(null)

  const navigate = useNavigate()
  // custom hook for uploading image
  const { image, caption, error, Handleimage, createFormData } =
    useImageHandler()

  // style format for drag and drop
  const handleStyleEnter = e => {
    e.preventDefault()
    e.stopPropagation()
    dropRef.current.style.border = '2px dashed var(--secondary-clr-lter-purple)'
  }

  const handleStyleLeave = e => {
    e.preventDefault()
    e.stopPropagation()
    dropRef.current.style.border = '1px solid var(--secondary-clr-lter-purple)'
  }

  const handleStyleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    dropRef.current.style.border = '1px solid var(--secondary-clr-lter-purple)'
    Handleimage(e.dataTransfer.files[0])
  }

  const [
    createPost,
    { data, isSuccess, isLoading, isError, error: createPostError }
  ] = useCreatePostMutation()

  const handleCreatePost = () => {
    createPost({
      content
      // media: image
    })
  }

  useEffect(() => {
    if (isSuccess) {
      setToggleCreatePost(false)
    }
  }, [isSuccess])

  return (
    <div className={createPostStyles.container}>
      <div className={createPostStyles.header}>
        <h1 className={createPostStyles.h1}>Add a post</h1>
        <p className={createPostStyles.p}>
          To successfully upload your file, make sure they follow the
          guidelines.
        </p>
      </div>

      <div className={createPostStyles.userBadge}>
        <div className={createPostStyles.avatar}>
          {user?.profilePicture ? (
            <img
              src={user?.profilePicture}
              alt=''
              className={createPostStyles.img}
            />
          ) : (
            <ProfileCircle
              size={45}
              color='#555555'
              className={createPostStyles.iconAvatar}
            />
          )}
        </div>
        <div className={createPostStyles.names}>
          {user?.firstName} {user?.lastName}
        </div>
      </div>

      <form
        action=''
        className={createPostStyles.formContainer}
        onSubmit={e => {
          e.preventDefault()
          handleCreatePost()
        }}
      >
        <div className={createPostStyles.text}>
          <textarea
            name='text'
            id='text'
            cols='30'
            rows='10'
            placeholder='Write something...'
            className={createPostStyles.textarea}
            onChange={e => setContent(e.target.value)}
          ></textarea>
        </div>
        <div
          className={createPostStyles.uploadMedia}
          ref={dropRef}
          onDragEnter={e => handleStyleEnter(e)}
          onDragLeave={e => handleStyleLeave(e)}
          onDragOver={e => handleStyleEnter(e)}
          onDrop={e => handleStyleDrop(e)}
        >
          {image ? (
            <div className={createPostStyles.mediaDisplay}>
              <label for='media' className={createPostStyles.change}>
                Change <ArrowRotateLeft size='18' color='#585DCC' />
              </label>
              <input
                type='file'
                name='media'
                id='media'
                ref={chooseref}
                onChange={e => Handleimage(e.target.files[0])}
                className={createPostStyles.fileInput}
              />
              <img src={image} alt='media' className={createPostStyles.media} />
            </div>
          ) : (
            <div className={createPostStyles.uploadMediaContent}>
              <LuShare className={createPostStyles.uploadIcon} />
              <p className={createPostStyles.uploadText}>
                Drag and drop files to upload resources. For photo, use JPG or
                PNG. For videos, use MP4 or MOV.
              </p>
              <label for='media' className={createPostStyles.inputLabel}>
                Select from your computer
              </label>
              <input
                type='file'
                name='media'
                id='media'
                ref={chooseref}
                onChange={e => Handleimage(e.target.files[0])}
                className={createPostStyles.fileInput}
              />
            </div>
          )}
        </div>

        <button
          type='submit'
          className={createPostStyles.postBtn}
          disabled={isLoading}
        >
          {isLoading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  )
}