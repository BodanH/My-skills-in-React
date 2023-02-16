import React, { useRef, useState, localeCompare, useMemo, useEffect } from "react";
import "../styles/App.css"
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostServise";
import getPageCount from "../utils/pagges";
import MyButton from "../components/UI/Button/MyButton";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/MyModal/MyModal";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/paginatin/pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";



function Posts() {
  const [posts, setPosts] = useState([
    { id: 1, title: "q3q", body: "Descri45eption"},
    { id: 2, title: "2", body: "cription"},
    { id: 3, title: "Ja", body: "aDescription"},
  ])

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching( async(limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    setTotalPages(response.headers["x-total-count"]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  })
  
  useEffect(() => {
    fetchPosts(limit, page);
  },[page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }
  const removePost = (post => {
    setPosts(posts.filter(p => p.id !== post.id))
  });

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className="App">
      <MyButton style = {{marginTop: "60px"}} onClick={()=>setModal(true)}>MyModal</MyButton>
      <MyModal visible={modal} setVisible = {setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <button onClick={fetchPosts}>Get posts</button>
      <hr style={{ margin: "15px" }}></hr>

      <PostFilter filter={filter} setFilter={setFilter} />

      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaulValue="Posts"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value:-1, name: "all" },
        ]}
      />

      {postError &&
        <h1>error ${postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="posts 1" />
      <div ref={lastElement} style={{height:20, background:"red"}}></div>
      {isPostsLoading &&
        <div style={{display: "flex", justifyContent:"center", marginTop:"50px"}}><Loader/></div>
      }  
      <Pagination page={page} changePage={changePage} totalPages={totalPages}></Pagination>
    </div>
  );
}

export default Posts;