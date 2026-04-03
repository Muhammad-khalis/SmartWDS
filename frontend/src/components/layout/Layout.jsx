import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <main className="bg-gray-50 min-h-screen">
          {children}
        </main>

      </div>

    </div>

  );

};

export default Layout;