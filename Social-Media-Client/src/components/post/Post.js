import React, { useEffect, useState } from "react";
import Avatar from "../Avatar/Avatar";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { likeAndUnlikePost } from "../../redux/slices/postsSlice";
import { useNavigate } from "react-router";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";
import "./Post.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import { axiosClient } from "../../utils/axiosClient";
import { render } from "react-dom";

function Post({ post }) {
  const [option, setOption] = useState("optn-icon");
  const [editOption, setEditOption] = useState("editOption");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handlePostLiked() {
    dispatch(
      likeAndUnlikePost({
        postId: post._id,
      })
    );
  }
  const openOptions = () => {
    setOption("optn-box");
    setEditOption("editOptionOpen");
  };

  const deletePost = async () => {
    try {
      console.log("post axios", post._id, typeof post._id);
      const response = await axiosClient.delete("/posts", {
        data: { postId: post._id },
      });
      console.log("response", response);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div className="Post">
      <div className="heading">
        <div
          className="left-part hover-link"
          onClick={() => navigate(`/profile/${post.owner._id}`)}
        >
          <Avatar src={post.owner?.avatar?.url} />
          <h4>{post.owner?.name}</h4>
        </div>
        <div className={option} onClick={openOptions}>
          <BsThreeDotsVertical className=" hover-link" />

          <div className={editOption}>
            <p>Edit</p>
            <p onClick={deletePost}> Delete</p>
          </div>
        </div>
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="post_img" />
      </div>
      <div className="footer">
        <div className="like" onClick={handlePostLiked}>
          {post.isLiked ? (
            <AiFillHeart style={{ color: "red" }} className="icon" />
          ) : (
            <AiOutlineHeart className="icon" />
          )}
          <h4>{`${post.likesCount} likes`}</h4>
        </div>
        <p className="caption">{post.caption}</p>
        <h6 className="time-ago">{post?.timeAgo}</h6>
      </div>
    </div>
  );
}

export default Post;
