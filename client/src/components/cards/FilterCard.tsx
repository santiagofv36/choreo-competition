interface FilterCardProps<T> {
  title: string;
  options: {
    id: string | number;
    name: string;
    created_at?: string;
    updated_at?: string;
  }[];
  option: T;
  setOption: React.Dispatch<React.SetStateAction<T>>;
}

export default function FilterCard<T>({
  title,
  options,
  option,
  setOption,
}: FilterCardProps<T>): JSX.Element {
  const handleSetOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value === option) {
      setOption('' as T);
      return;
    }

    setOption(value as T);
  };

  return (
    <div className="flex flex-col gap-4 border border-border-color p-4 rounded-md shadow-md w-full">
      <h1 className="text-base font-regular">
        {' '}
        <span className="font-bold text-xl">|</span> {title}
      </h1>
      <ul className="flex flex-col gap-2">
        {options &&
          options?.map((_option, idx) => (
            <div className="flex gap-8" key={idx}>
              <input
                type="checkbox"
                checked={_option.id === option}
                value={_option.id}
                onChange={handleSetOption}
              />
              <li key={_option.id} className="text-sm font-thin">
                {_option.name}
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
}
