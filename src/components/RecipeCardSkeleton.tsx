import { Card, CardContent } from "@/components/ui/card"

export const RecipeCardSkeleton = () => {
  return (
    <Card className="overflow-hidden h-full border-border p-0 gap-0" aria-hidden="true">
      <div className="aspect-[16/9] bg-muted animate-pulse" />
      <CardContent className="p-4 space-y-3">
        <div className="h-3 w-16 bg-muted rounded animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex gap-3">
          <div className="h-3 w-12 bg-muted rounded animate-pulse" />
          <div className="h-3 w-14 bg-muted rounded animate-pulse" />
          <div className="h-3 w-10 bg-muted rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}
