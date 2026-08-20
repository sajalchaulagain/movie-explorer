function ErrorMessage({ message = "Something went wrong." }) {
    return (
        <div className="mt-6 rounded-lg border border-rose-400/50 bg-rose-400/10 p-4">
            <p className="text-rose-200">{message}</p>
        </div>
    );
}

export default ErrorMessage;
