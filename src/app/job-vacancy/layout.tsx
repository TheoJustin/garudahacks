export default function JobVacancyLayout({
    children,
} : Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        <div className="w-full h-fit flex justify-start items-center p-6">
            {children}
        </div>
        </>
    )
}