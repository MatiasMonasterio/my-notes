import Link from "next/link";
import { BiNote } from "react-icons/bi";
import { Container } from "@/components";

export default function Navbar() {
  return (
    <div className="px-4 py-4 mb-8 border-b-4 border-zinc-800">
      <Container maxWidth="lg">
        <h1 className="font-semibold">
          <Link href="/" className="flex items-center gap-2 hover:text-sky-400">
            <BiNote />
            My Notes
          </Link>
        </h1>
      </Container>
    </div>
  );
}
