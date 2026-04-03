import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  BarChart3,
  Package,
  ClipboardList,
  Warehouse,
  Layers,
  Grid3X3,
  Archive,
  Box,
  ArrowDownCircle,
  ArrowUpCircle
} from "lucide-react";

const Sidebar = () => {

  const linkStyle =
    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition";

  const activeStyle =
    "bg-blue-600 text-white shadow";

  const normalStyle =
    "text-gray-300 hover:bg-gray-800 hover:text-white";

  return (

    <div className="h-screen w-64 bg-gray-900 text-gray-200 flex flex-col border-r border-gray-800">

      {/* LOGO */}

      <div className="p-6 border-b border-gray-800">

        <h1 className="text-xl font-bold tracking-wide text-white">
          Smart WDS
        </h1>

        <p className="text-xs text-gray-400 mt-1">
          Warehouse System
        </p>

      </div>



      {/* MENU */}

      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">

        {/* DASHBOARD */}

        <div className="space-y-2">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : normalStyle}`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

        </div>



        {/* ANALYTICS */}

        <div>

          <p className="text-xs uppercase text-gray-500 mb-2 px-2">
            Analytics
          </p>

          <NavLink
            to="/charts"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : normalStyle}`
            }
          >
            <BarChart3 size={18} />
            Charts
          </NavLink>

        </div>



        {/* INVENTORY */}

        <div>

          <p className="text-xs uppercase text-gray-500 mb-2 px-2">
            Inventory
          </p>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : normalStyle}`
            }
          >
            <Package size={18} />
            Products
          </NavLink>

          <NavLink
            to="/ledger"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : normalStyle}`
            }
          >
            <ClipboardList size={18} />
            Ledger
          </NavLink>

        </div>



        {/* WAREHOUSE */}

        <div>

          <p className="text-xs uppercase text-gray-500 mb-2 px-2">
            Warehouse
          </p>

          <NavLink
            to="/warehouses"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : normalStyle}`
            }
          >
            <Warehouse size={18} />
            Warehouses
          </NavLink>

          <NavLink
            to="/zones"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : normalStyle}`
            }
          >
            <Layers size={18} />
            Zones
          </NavLink>

          <NavLink
            to="/aisles"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : normalStyle}`
            }
          >
            <Grid3X3 size={18} />
            Aisles
          </NavLink>

          <NavLink
            to="/racks"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : normalStyle}`
            }
          >
            <Archive size={18} />
            Racks
          </NavLink>

          <NavLink
            to="/bins"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : normalStyle}`
            }
          >
            <Box size={18} />
            Bins
          </NavLink>

        </div>



        {/* OPERATIONS */}

        <div>

          <p className="text-xs uppercase text-gray-500 mb-2 px-2">
            Operations
          </p>

          <NavLink
            to="/inbound"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : normalStyle}`
            }
          >
            <ArrowDownCircle size={18} />
            Inbound
          </NavLink>

          <NavLink
            to="/outbound"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : normalStyle}`
            }
          >
            <ArrowUpCircle size={18} />
            Outbound
          </NavLink>

        </div>

      </nav>

    </div>

  );

};

export default Sidebar;