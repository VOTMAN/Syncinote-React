import { Note } from "@/Types/note"
import { deleteNote } from "../utils/deleteNote"
// import { useToast } from "../Context/ToastProvider"

interface DeleteButtonProps {
  note: Note
  notes: Note[]
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>
  setCurNote: React.Dispatch<React.SetStateAction<Note>>
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ note, notes, setNotes, setCurNote }) => {
//   const { showToast } = useToast()
  
  const handleDelete = async () => {
    const res = await deleteNote({ data: note.id })

    // if (res?.status === 500 || res?.success == false) {
    //   showToast(res.error, "error")
    //   return
    // }

    const remaining = notes.filter(n => n.id !== note.id)
    setNotes(remaining)
    setCurNote(remaining[0])

    // showToast("Note deleted!", "success")

    document.getElementById("my_modal_5").close()
  }

  return (
    <>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete note</h3>
          <p className="py-4">Are you sure you want to delete this note?</p>
          <div className="modal-action">
            <button className="btn bg-red-500 text-white" onClick={handleDelete}>
              Yes, delete
            </button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>

      <button
        className="ml-1 bg-red-500 rounded text-white px-4 py-2 cursor-pointer hover:bg-red-600"
        onClick={() => (document.getElementById("my_modal_5") as HTMLDialogElement)?.showModal()}
      >
        🗑
      </button>
    </>
  )
}

export default DeleteButton