import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center space-y-4 p-6 justify-center">
            <Skeleton className="h-6 w-1/2 rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-4 w-2/3 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
        </div>
    );
}
