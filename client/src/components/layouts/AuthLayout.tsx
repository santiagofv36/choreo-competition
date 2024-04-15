interface AuthLayoutProps {
  children: React.ReactNode;
  isReverse?: boolean;
}

export default function AuthLayout({ children, isReverse }: AuthLayoutProps) {
  return (
    <section
      className={`border border-border-color rounded-xl w-full shadow-xl flex flex-col justify-start relative xl:h-[800px] ${
        isReverse ? 'xl:flex-row-reverse' : 'xl:flex-row'
      }`}
    >
      {children}
    </section>
  );
}
