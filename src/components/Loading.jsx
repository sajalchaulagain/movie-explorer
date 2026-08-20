function Loading({ message = "Loading..." }) {
    return (
        <div className="mt-6 rounded-lg border border-amber-400/40 bg-amber-400/10 p-4">
            <p className="text-amber-200">{message}</p>
        </div>
    );
}

export default Loading;
