import Link from "next/link";
import { useEffect, useState } from "react";
import { MainLayout } from "ui/components/mainLayout";
import ListItemService from "ui/components/search/listItemService";

export default function SearchPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function loadGlobalState() {
      try {
        const response = await fetch(
          "http://bw4dl-smaaa-aaaaa-qaacq-cai.localhost:4943/service/list",
          {
            redirect: "follow",
            method: "GET",
          }
        );
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadGlobalState();
  }, []);

  return (
    <>
      <nav className="flex justify-between items-center py-4 px-8">
        <div className="flex space-x-8">
          <Link className="text-xl font-bold" href="/">
            Triourism
          </Link>
          <a
            className="flex items-center justify-center text-xl font-bold"
            href="#"
          >
            Cholula, Puebla
          </a>
        </div>
      </nav>
      <MainLayout>
        <div className="flex flex-col">
          <h1>Search</h1>
          <div className="flex flex-row flex-wrap overflow-y-auto">
            {services &&
              services.map((service) => (
                <div key={service.id}>
                  <ListItemService service={service} />
                </div>
              ))}
          </div>
        </div>
      </MainLayout>
    </>
  );
}
