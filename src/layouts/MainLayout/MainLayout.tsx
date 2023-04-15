import { Navbar } from "@/components";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="mb-12">
      <Navbar /> {children}
    </div>
  );
}
