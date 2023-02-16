import React, { useContext } from "react";
import MyInput from "../components/UI/Input/MyInput";
import MyButton from "../components/UI/Button/MyButton"
import { AuthContext } from "../context/Context";

const Login = () => {

    const { isAuth, setIsAuth } = useContext(AuthContext);

    const submit = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem("auth", "true")
    }

    return (
        <div>
            <h1>Page Login</h1>
            <form onSubmit={submit}>
                <MyInput type="text" placeholder="Enter login"></MyInput>
                <MyInput type="password" placeholder="Enter password"></MyInput>
                <MyButton>Log in</MyButton>
            </form>
        </div>
    )
}
export default Login;