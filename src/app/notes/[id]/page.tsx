export default async function NoteDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div>My Note: {id}</div>;
}
