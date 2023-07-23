export default function NavigationContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="my-4 flex flex-1 flex-col gap-1 overflow-y-auto">
            {children}
        </div>
    );
}
