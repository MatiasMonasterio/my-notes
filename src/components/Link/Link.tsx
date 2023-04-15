import NextLink from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function Link({ href, children }: Props) {
  return (
    <NextLink href={href} className="text-sky-400 hover:text-sky-300">
      {children}
    </NextLink>
  );
}
