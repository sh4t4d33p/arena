import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string
  slot?: string
}

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, slot, ...props }, ref) => {
    return (
      <Slot
        ref={ref}
        className={cn(labelVariants({ className }))}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label }
