import { useRouter } from "next/router";
import { MainLayout } from "ui/components/mainLayout";
import { ArrowLeft, Star, StarIcon } from "lucide-react";
import { Button } from "ui/@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "ui/@/components/ui/popover";
import { Calendar } from "ui/@/components/ui/calendar";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

export default function ServiceById() {
  const router = useRouter();
  const { id } = router.query;
  const [range, setRange] = useState<DateRange | undefined>();

  const [service, setService] = useState<{
    id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
    unit: string;
    location: string;
    type: string;
    owner: string;
    status: string;
    lat: number;
    long: number;
    country: string;
    state: string;
    city: string;
  }>(null);

  const [reviews, setReviews] = useState<
    {
      id: string;
      bookingId: string;
      serviceId: string;
      userId: string;
      userName: string;
      rating: number;
      comment: string;
    }[]
  >(null);
  useEffect(() => {
    async function loadGlobalState() {
      try {
        const response = await fetch(
          `http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:4943/find-service?id=${id}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setService(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadGlobalState();
  }, [id]);

  useEffect(() => {
    async function loadReviews() {
      try {
        const response = await fetch(
          `http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:4943/find-reviews?id=${id}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadReviews();
  }, [id]);

  if (!service) {
    return <div>Loading...</div>;
  }

  let dates;
  if (range?.from) {
    if (!range.to) {
      dates = format(range.from, "PPP");
    } else if (range.to) {
      dates = `${format(range.from, "PPP")}–${format(range.to, "PPP")}`;
    }
  }

  return (
    <div>
      <nav className="flex justify-between items-center py-4 px-8">
        <div className="flex space-x-8">
          <button
            className="text-lg flex flex-row"
            onClick={() => router.back()}
          >
            <ArrowLeft size={20} className="m-1 mr-2" />
            Regresar
          </button>
        </div>
      </nav>
      <MainLayout className={"justify-center"}>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-[#252836] dark:bg-gray-800 border-b border-black w-[500px]">
                <img
                  alt={service.name}
                  className="object-cover w-full h-64 rounded-lg"
                  height={500}
                  src="https://placehold.it/500x500"
                  style={{
                    aspectRatio: "500/500",
                    objectFit: "cover",
                  }}
                  width={500}
                />
                <h1 className="font-bold text-3xl mt-4">{service.name}</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {service.description}
                </p>
                <h2 className="font-bold text-2xl mt-4">
                  ${service.price}/{service.unit}
                </h2>
                <div className="mt-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="w-full justify-start text-left font-normal text-black"
                        variant="outline"
                      >
                        <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                        Select Dates {dates ? `(${dates})` : ""}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        initialFocus
                        mode="range"
                        numberOfMonths={2}
                        selected={range}
                        onSelect={setRange}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button className="w-full mt-4 hover:bg-purple-600">
                  Reserve and Pay
                </Button>
              </div>
            </div>
            <div className="bg-[#252836] dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mt-4">
              <div className="p-6 bg-[#252836] dark:bg-gray-800 border-b border-black">
                <h2 className="font-bold text-2xl">Customer Reviews</h2>
                {reviews?.map((review) => (
                  <div className="mt-4">
                    <p className="font-bold">{review.userName}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {review.comment}
                    </p>
                    {review.rating > 0 && (
                      <div className="flex mt-2">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <StarIcon
                            key={i}
                            fill="yellow"
                            className="h-4 w-4 text-yellow-500"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

function CalendarDaysIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
