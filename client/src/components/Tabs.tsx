interface TabsProps {
  tabs: {
    title: string;
    active: boolean;
  }[];
  onClick: (index: string) => void;
}

export default function Tabs({ tabs, onClick }: TabsProps) {
  return (
    <header className="w-full">
      <div className="flex justify-start gap-4 w-full">
        {tabs.map((tab, index) => {
          return (
            <div className="flex gap-4" key={index * 96}>
              <button
                key={index}
                className={`text-2xl font-bold ${
                  tab?.active ? 'text-primary' : 'text-primary/50'
                }`}
                onClick={() => {
                  onClick(tab?.title);
                }}
              >
                {tab?.title}
              </button>
              {index !== tabs.length - 1 && (
                <span
                  className="text-2xl font-bold text-primary"
                  key={index + 5}
                >
                  |
                </span>
              )}
            </div>
          );
        })}
      </div>
    </header>
  );
}
