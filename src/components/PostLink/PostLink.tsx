import { Link } from "@/components";

interface Post {
  index: string;
  title: string;
  id: string;
}

interface Props {
  post: Post;
  href: string;
}

export default function PostLink({ post, href }: Props) {
  return (
    <div>
      <span className="inline-block mr-4 text-xs">{post.index}</span>
      <Link href={href}>{post.title}</Link>
    </div>
  );
}
