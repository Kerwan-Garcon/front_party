import { Navbar } from "@/components/layout/global/NavBar";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default BrowseLayout;
