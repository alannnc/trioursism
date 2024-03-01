/**
 * v0 by Vercel.
 * @see https://v0.dev/t/EJod4ummLbS
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Image from "next/image";
import Link from "next/link";
import { CardContent, Card } from "ui/@/components/ui/card";

export default function ListItemService({ service }) {
  const { name, description, id } = service;
  return (
    <Link href={`/service/${id}`}>
      <Card className="m-2 w-[400px] h[300px] bg-[#252836] text-white border-0">
        <CardContent className="pt-6">
          <Image
            alt={name}
            className="w-full h-48 object-cover"
            height="200"
            src="https://placehold.it/200x200"
            style={{
              aspectRatio: "200/200",
              objectFit: "cover",
            }}
            width="200"
          />
          <h3 className="mt-4 text-lg font-semibold">{name}</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
