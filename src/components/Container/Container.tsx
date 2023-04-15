interface Props {
  children: React.ReactNode;
  maxWidth: "sm" | "md" | "lg";
}

const sizes = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
};

export default function Container({ children, maxWidth = "md" }: Props) {
  return <div className={`${sizes[maxWidth]} mx-auto`}>{children}</div>;
}
