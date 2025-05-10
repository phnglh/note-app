export default async function NoteDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div className="text-2xl text-amber-500">My Note: {id}</div>;
}
