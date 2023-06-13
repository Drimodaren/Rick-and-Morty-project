import BackButton from ".";

export const withBackButton = Component => props => {
    return (
        <>
            {" "}
            <BackButton /> <Component {...props} />{" "}
        </>
    );
};
