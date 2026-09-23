export default async function GenreDetailPage({
  params,
}: {
  params: Promise<{ genreId: string }>;
}) {
  const { genreId } = await params;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Genre Movies ({genreId})</h1>
    </div>
  );
}
