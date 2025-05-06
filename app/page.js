import Link from "next/link";


export default function Home() {
  return (
    <div className="bg-gray-300 py-10 mt-20">
      <div className="flex flex-col text-center space-y-10">
        <h2 className="font-semibold text-3xl text-gray-800">Pick your poison</h2>
      <div className="flex items-center justify-center gap-4">
        <div>
          <Link href="/tictactoe" className="bg-gray-700 font-bold text-xl text-white px-4 py-5 rounded-2xl hover:bg-gray-600">
          tic tac toe
          </Link>
        </div>
        <div>
          <Link href="/quiz" className="bg-gray-700 font-bold text-xl text-white px-4 py-5 rounded-2xl hover:bg-gray-600">
          quiz
          </Link>
        </div>
        <div>
          <Link href="/simon-says" className="bg-gray-700 font-bold text-xl text-white px-4 py-5 rounded-2xl hover:bg-gray-600">
         simon says
          </Link>
        </div>
        <div>
          <Link href="/reaction" className="bg-gray-700 font-bold text-xl text-white px-4 py-5 rounded-2xl hover:bg-gray-600">
          reaction time
          </Link>
        </div>
        <div>
          <Link href="/slots" className="bg-gray-700 font-bold text-xl text-white px-4 py-5 rounded-2xl hover:bg-gray-600">
          slots
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
