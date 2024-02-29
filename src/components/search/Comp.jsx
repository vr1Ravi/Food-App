import StarIcon from "@mui/icons-material/Star";
const Comp = () => {
  return (
    <div class="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4 shadow">
      <div class=" animate-pulse ">
        <div class="m-auto h-20 w-20 rounded-full bg-slate-200"></div>
        <div class="flex-1 space-y-6 py-1">
          <div class="mt-2 h-2 rounded bg-slate-200"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 rounded bg-slate-200"></div>
              <div class=" h-2 rounded bg-slate-200"></div>
              <div class=" h-2 rounded bg-slate-200"></div>
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

export default Comp;
