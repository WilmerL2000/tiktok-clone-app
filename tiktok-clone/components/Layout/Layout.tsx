import { Sidebar, Navbar } from '..';

type LayoutProps = {
  children: JSX.Element;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>
        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1 items-center">
          {children}
        </div>
      </div>
    </div>
  );
};
export default Layout;
