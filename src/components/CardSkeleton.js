export default function CardSkeleton() {
  return (
    <div className="card border border-base-300 h-full">
      <div className="skeleton aspect-[4/3] w-full rounded-b-none" />
      <div className="card-body p-5 gap-3">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-8 w-full mt-3" />
      </div>
    </div>
  );
}