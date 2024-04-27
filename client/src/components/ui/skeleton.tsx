import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/80 dark:bg-primary/80", className)}
      {...props}
    />
  )
}

export { Skeleton }
