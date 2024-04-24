/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4tReG3J7nKY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { AvatarImage, AvatarFallback, Avatar } from "ui/@/components/ui/avatar";
import { Card } from "ui/@/components/ui/card";

const reviews = [
  {
    name: "Damon Chen",
    avatar: "https://placehold.it/40x40",
    comment: "Excellent service",
    serviceTitle: "Hotel Santa Remedios",
    location: "Cholula, Puebla, Mexico",
  },
  {
    name: "Marc Lou",
    avatar: "https://placehold.it/40x40",
    comment: "Great experience",
    serviceTitle: "Hotel Santa Remedios",
    location: "Cholula, Puebla, Mexico",
  },
  {
    name: "Zedd",
    avatar: "https://placehold.it/40x40",
    comment: "Everything was perfect",
    serviceTitle: "Paseo",
    location: "Cholula, Puebla, Mexico",
  },
  {
    name: "Emma Watson",
    avatar: "https://placehold.it/40x40",
    comment: "Went with my family",
    serviceTitle: "Tour guiado",
    location: "Cholula, Puebla, Mexico",
  },
  {
    name: "Elon Musk",
    avatar: "https://placehold.it/40x40",
    comment: "Absolutely amazing",
    serviceTitle: "Tour guiado",
    location: "Cholula, Puebla, Mexico",
  },
  {
    name: "Zedd",
    avatar: "https://placehold.it/40x40",
    comment: "Definitely recommend",
    serviceTitle: "Hotel Santa María",
    location: "Cholula, Puebla, Mexico",
  },
  {
    name: "Emma Watson",
    avatar: "https://placehold.it/40x40",
    comment: "Great experience",
    serviceTitle: "Hotel Santa María",
    location: "Cholula, Puebla, Mexico",
  },
  {
    name: "Elon Musk",
    avatar: "https://placehold.it/40x40",
    comment: "5 startups",
    serviceTitle: "Founder",
    location: "Cholula, Puebla, Mexico",
  },
];

export default function ReviewsComponent() {
  return (
    <div className="overflow-auto py-16 flex flex-col justify-center items-center border-0">
      <div className="-mx-6 px-6 space-y-8 flex flex-col">
        <div className="flex gap-8 items-center -ml-2">
          {reviews.map((review, index) => (
            <Card className="w-[240px] bg-[#252836] p-4 group border-0" key={index}>
              <div className="flex flex-row">
                <Avatar>
                  <AvatarImage alt={review.name} src={review.avatar} />
                  <AvatarFallback>
                    {review.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="ml-2 text-sm font-semibold text-white flex items-center justify-center">
                  {review.name}
                </p>
              </div>
              <div className="mt-2 text-left">
                <p className="text-xs text-gray-400">{review.comment}</p>
                <p className="text-xs text-gray-400">{review.serviceTitle}</p>
                <p className="text-xs text-gray-400">{review.location}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="flex gap-8 items-center -ml-24">
          {reviews.map((review, index) => (
            <Card className="w-[240px] bg-[#252836] p-4 border-0" key={index}>
              <div className="flex flex-row">
                <Avatar>
                  <AvatarImage alt={review.name} src={review.avatar} />
                  <AvatarFallback>
                    {review.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="ml-2 text-sm font-semibold text-white flex items-center justify-center">
                  {review.name}
                </p>
              </div>
              <div className="mt-2 text-left">
                <p className="text-xs text-gray-200">{review.comment}</p>
                <p className="text-xs text-gray-400">{review.serviceTitle}</p>
                <p className="text-xs text-gray-400 italic">{review.location}</p>
              </div>
            </Card>
          ))}
        </div>
        
      </div>
    </div>
  );
}
