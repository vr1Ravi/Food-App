import StarIcon from "@mui/icons-material/Star";
const MealsSkeleton = () => {
  return (
    <div className="mx-auto h-fit w-full max-w-sm rounded-md border border-blue-300 p-4 shadow">
      <div className=" animate-pulse ">
        <div className="m-auto h-20 w-20 rounded-full bg-slate-200"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="mt-2 h-2 rounded bg-slate-200"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 rounded bg-slate-200"></div>
              <div className=" h-2 rounded bg-slate-200"></div>
              <div className=" h-2 rounded bg-slate-200"></div>
            </div>
            <StarIcon className="text-slate-200" />
            <StarIcon className="text-slate-200" />
            <StarIcon className="text-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsSkeleton;
