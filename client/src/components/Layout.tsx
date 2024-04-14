interface LayoutProps {
  children: React.ReactNode;
  sectionClassName?: string;
}

export default function Layout({ children, sectionClassName }: LayoutProps) {
  return (
    <main className="flex flex-col justify-center items-center w-full lg:px-24">
      <section
        className={`flex flex-col lg:flex-row gap-12 justify-center p-5 mb-12 bg-bg-neutral w-full py-32 ${sectionClassName}`}
      >
        {children}
      </section>
    </main>
  );
}
