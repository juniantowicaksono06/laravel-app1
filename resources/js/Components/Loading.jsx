import HashLoader from "react-spinners/HashLoader";
const Login = (props) => {
    const show = props.isLoading ? "d-flex" : "d-none";
    return (
        <div id="loadingContainer" className={`${show} justify-content-center align-items-center`}>
            <HashLoader color="#d6368f" loading={props.isLoading} size={80} aria-label="Loading Spinner" data-testid="loader" />
        </div>
    );
}

export default Login