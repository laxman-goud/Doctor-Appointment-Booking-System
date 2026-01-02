
const Loading = ({ text = "Loading doctor details..." }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
            {/* Spinner */}
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

            {/* Loading text */}
            <p className="text-primary text-sm font-medium">
                {text}
            </p>
        </div>
    )
}

export default Loading