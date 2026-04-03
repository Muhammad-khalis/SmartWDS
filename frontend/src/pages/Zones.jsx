import { useEffect, useState } from "react";
import { getZones } from "../services/zone.service.js";
import ZoneForm from "../components/zones/ZoneForm.jsx";
import ZoneTable from "../components/zones/ZoneTable.jsx";


const Zones = () => {

  const [zones, setZones] = useState([]);
  const [page, setPage] = useState(1);

  const fetchZones = async () => {

    try {

      const res = await getZones(page);

      setZones(res.zones || []);

    } catch (error) {

      console.error("Failed to fetch zones");

    }

  };

  useEffect(() => {

    fetchZones();

  }, [page]);

  return (

    <div className="p-8 space-y-8">

      <h1 className="text-3xl font-bold">
        Zone Management
      </h1>

      <ZoneForm refresh={fetchZones} />

      <ZoneTable zones={zones} refresh={fetchZones} />

    </div>

  );

};

export default Zones;