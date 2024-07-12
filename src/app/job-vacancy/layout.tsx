import Footer from "@/lib/components/footer";
import Navbar from "@/lib/components/navbar";

export default function JobVacancyLayout({
    children,
} : Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        <div className="bg-primary-foreground min-h-screen">
          <Navbar hoveredClassName="bg-[#f9fafc]"/>
          <div className="w-full h-fit flex justify-start items-center p-6 px-12">
              {children}
          </div>
        </div>
        <Footer className="bg-primary-foreground"/>
        </>
    )
}