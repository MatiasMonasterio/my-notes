import type { PostBreadcrumbItem } from "@/types";

import { BiArrowBack } from "react-icons/bi";
import { Link } from "@/components";

interface Props {
  items: PostBreadcrumbItem[];
}

export default function PostBreadcrumb({ items }: Props) {
  return (
    <nav className="flex items-center gap-2 mb-1 text-sm">
      <Link href="/">Home</Link>

      {items.map((item) => (
        <div key={item.href} className="flex items-center gap-2">
          <span className="text-gray-400 rotate-180">
            <BiArrowBack />
          </span>

          <Link href={item.href}>{item.title}</Link>
        </div>
      ))}
    </nav>
  );
}
