interface AuthLayoutProps {
  children: React.ReactNode;
  isReverse?: boolean;
}

export default function AuthLayout({ children, isReverse }: AuthLayoutProps) {
  return (
    <section
      className={`border border-border-color rounded-xl w-full shadow-xl flex justify-start relative h-[800px] ${
        isReverse ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {children}
    </section>
  );
}
