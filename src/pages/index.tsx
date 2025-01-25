import Link from "next/link";

export default function Root() {
  return (
    <div className="flex flex-col w-full h-lvh mt-0 justify-center items-center">
      <div className="flex flex-col w-full h-full justify-center items-center py-10 text-slate-100 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600 via-grey-900 to-black">
        <p className="font-extrabold text-7xl mb-2">
          Crypto tracking
        </p>
        <p className="font-extrabold text-7xl mb-6">
          made easy
        </p>
        <p className="text-2xl mb-4">
          Track your crypto and easily generate portfolio analysis
        </p>
        <Link href="/auth/signup" passHref>
          <button className="flex justify-center items-center text-slate-100 bg-blue-400 rounded-xl p-4 font-bold border border-blue-400 hover:bg-blue-600 hover:border-slate-100">
            Get started for free
          </button>
        </Link>
      </div>
    </div>
  );
}
