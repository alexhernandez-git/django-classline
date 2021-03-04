import React from "react";
import styled from "@emotion/styled";
import { IconContext } from "react-icons";
import { BiCommentDetail, BiTime } from "react-icons/bi";
import moment from "moment";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTimes, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { ButtonCustom } from "./ButtonCustom";
import MyCKEditor from "./MyCKEditor";
import { deletePost, editPost } from "../../redux/actions/posts";
import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Post = (props) => {
  const MySwal = withReactContent(Swal);

  const { pathname } = useLocation();
  const { program } = useParams();
  const { push } = useHistory();
  const { post } = props;
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  moment.locale("es");
  const handleIsOwner = () => {
    if (authReducer.user.id == post.user.id) {
      return true;
    } else {
      return false;
    }
  };
  const [isEdit, setIsEdit] = useState(false);
  const handleOpenEdit = () => {
    setIsEdit(true);
  };
  const handleCloseEdit = () => {
    setIsEdit(false);
  };
  const [message, setMessage] = useState(post.message);
  const handleEditMessage = (e) => {
    e.preventDefault();
    dispatch(
      editPost({
        id: post.code,
        message: message,
      })
    );
  };
  useEffect(() => {
    setMessage(post.message);
    handleCloseEdit();
  }, [post]);
  const handlePostDelete = (id) => {
    MySwal.fire({
      title: "Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        const dispatchDeletePost = (id) => dispatch(deletePost(id, push));
        dispatchDeletePost(post.code);
      }
    });
  };
  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Avatar>
            <img
              src={
                post.user.profile.picture
                  ? post.user.profile.picture
                  : "../../../static/assets/img/avatar.png"
              }
              alt=""
            />
          </Avatar>
          <span className="h5 mb-0 ml-3">
            {post.user.first_name} {post.user.last_name}
          </span>
        </div>
        {handleIsOwner() && (
          <div className="d-flex justify-content-center align-items-center">
            {!isEdit && (
              <>
                <IconContext.Provider
                  value={{
                    size: 16,
                    className: "mr-2 cursor-pointer",
                  }}
                >
                  <FaEdit onClick={handleOpenEdit} />
                </IconContext.Provider>
                <IconContext.Provider
                  value={{
                    size: 16,
                    className: "cursor-pointer",
                  }}
                >
                  <FaTrashAlt onClick={handlePostDelete} />
                </IconContext.Provider>
              </>
            )}
          </div>
        )}
      </div>
      {isEdit ? (
        <>
          <div className="m-3">
            <MyCKEditor
              value={message}
              handleEdit={(value) => {
                setMessage(value);
              }}
            />
          </div>
          <div className="d-sm-flex mx-3 mb-3 justify-content-end">
            <ButtonCustom
              onClick={(e) => handleEditMessage(e)}
              className="mr-2"
            >
              Editar
            </ButtonCustom>
            <ButtonCustom type="button" onClick={handleCloseEdit}>
              Cancelar
            </ButtonCustom>
          </div>
        </>
      ) : (
        <Link
          to={
            !/\/demo\//.test(pathname)
              ? `/academy/${program}/post/${post.code}`
              : pathname
          }
        >
          <div className="card-body text-dark">
            <p className="card-text new-line">{post.title}</p>
            <p className="card-text new-line">
              <span
                dangerouslySetInnerHTML={{
                  __html: post.message,
                }}
              />
            </p>
          </div>
          <div className="text-grey mx-3 mb-3">
            <div className="d-flex justify-content-between">
              <div>
                <IconContext.Provider
                  value={{
                    size: 20,
                  }}
                >
                  <BiCommentDetail />
                </IconContext.Provider>{" "}
                {post.comments}
              </div>
              <div>
                <IconContext.Provider
                  value={{
                    size: 20,
                  }}
                >
                  <BiTime />
                </IconContext.Provider>{" "}
                {moment(post.created).subtract(1, "seconds").fromNow()}
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};
const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
  }
`;
export default Post;
