import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "ui/@/components/ui/button";

const SearchButton = () => {
  return (
    <Link href="/search">
      <Button className="hover:bg-purple-700">Buscar</Button>
    </Link>
  );
};

export { SearchButton };
