import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostServise";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPostById, isLoading] = useFetching(async (id) => {
        const responce = await PostService.getById(id);
        setPost(responce.data);
    })

    const [fetchComment, isComLoading] = useFetching(async (id) => {
        const responce = await PostService.getCommentsById(id);
        setComments(responce.data);
    })

    useEffect(() => {
        fetchPostById(params.id);
        fetchComment(params.id)
    }, [])

    return (
        <div>
            <h1>The page is open. ID : {params.id}</h1>
            {isLoading ? <Loader /> :
                <div>
                    {post.id}. {post.title}
                </div>
            }
            <h1>Comments</h1>
            {
                isLoading ? <Loader /> : <div>
                    {comments.map(comm =>
                        <div key={comm.id} style={{marginTop : 15}}>
                            <h3>{comm.email}</h3>
                            <div>{comm.body}</div>
                        </div>
                        )}
                </div>
            }
        </div>
    )
}

export default PostIdPage;