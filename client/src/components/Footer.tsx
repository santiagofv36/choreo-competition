import Logo from './icons/Logo';

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center bg-text-color w-full py-12 px-4 text-white">
      <Logo className="size-32 text-white" />
      <section className="grid grid-cols-2 gap-4 md:grid-cols-2 w-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="uppercase text-lg text-white">products</h1>
          <span className="text-sm text-white/50">Electronics</span>
          <span className="text-sm text-white/50">Beauty</span>
          <span className="text-sm text-white/50">Food</span>
          <span className="text-sm text-white/50">Clothing</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="uppercase text-lg text-white">products</h1>
          <span className="text-sm text-white/50">Electronics</span>
          <span className="text-sm text-white/50">Beauty</span>
          <span className="text-sm text-white/50">Food</span>
          <span className="text-sm text-white/50">Clothing</span>
        </div>
      </section>
      <div className="bg-white/50 my-4 h-[1px] w-full" />
      <div className="flex justify-center items-center mt-6">
        <span className="text-white/70">
          Copyright © 2024 Santiago & Diógenes Figueroa{' '}
        </span>
      </div>
    </footer>
  );
}
