export default function LandingLayout({
    children,
} : Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        <div className="w-full h-fit flex justify-start items-center">
            {children}
        </div>
        </>
    )
}