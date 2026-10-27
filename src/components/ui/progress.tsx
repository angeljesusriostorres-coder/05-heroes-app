import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cn } from "cn"

function Progress({
  className,
  children,
  value,
  BgBarColor,
  PrBarColor,
  ...props
}: ProgressPrimitive.Root.Props & { BgBarColor?: string, PrBarColor?: string }) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {children}
      < ProgressTrack BgBarColor={BgBarColor} >
        <ProgressIndicator PrBarColor={PrBarColor} />
      </ProgressTrack >
    </ProgressPrimitive.Root >
  )
}

function ProgressTrack({ BgBarColor = 'bg-muted', className, ...props }: ProgressPrimitive.Track.Props & { BgBarColor?: string }) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "relative flex h-2 w-full items-center overflow-x-hidden rounded-full",
        className,
        BgBarColor
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  PrBarColor = "bg-primary",
  ...props
}: ProgressPrimitive.Indicator.Props & { PrBarColor?: string }) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn("h-full transition-all", className, PrBarColor)}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn("text-sm font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "ml-auto text-sm text-muted-foreground tabular-nums",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
