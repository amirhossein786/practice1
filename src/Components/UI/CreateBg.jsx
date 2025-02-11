const CreateBg = ({children, title}) => {
    return (
        <div className="w-10/12 my-10 mx-auto p-6 shadow-lg rounded-lg bg-table-color">
            <h1 className="text-3xl font-semibold mb-10 text-center">{title}</h1>
            {children}
        </div>
    );
};

export default CreateBg;