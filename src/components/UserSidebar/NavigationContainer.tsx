export default function NavigationContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mb-4 flex flex-1 flex-col justify-center gap-6 overflow-y-auto">
            {children}
        </div>
    );
}
