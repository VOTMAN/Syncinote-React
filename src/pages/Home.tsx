import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="text-center mt-auto">
        <h1 className="text-center text-3xl mb-5 font-bold">SynciNote</h1>
        <p>A local-first lightweight note-taking app with markdown support</p>
      </div>

      <Link
        to="/notes"
        className="text-center self-center mt-auto mb-auto p-2 cursor-pointer bg-amber-400 hover:bg-amber-500 text-slate-900 transition w-30 h-10 shadow rounded"
      >
        Click to Enter
      </Link>
    </div>
  )
}
