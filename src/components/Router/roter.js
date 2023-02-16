import About from "../../pages/About";
import PostIdPage from "../../pages/PostIdPage";
import Posts from "../../pages/Posts";
import Login from "../../pages/Login";


export const privateRouters = [
    { path: "/posts", element: <Posts /> },
    { path: "/posts/:id", element: <PostIdPage/>},
    { path: "/about", element: <About/>},
]


export const publickRouters = [
 { path: "/login", element: <Login/>}
]

