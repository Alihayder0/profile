export default function projectsPage({ params }) {
  return (
    <div className="h-[80vh] flex items-center justify-center">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Project ID: {params.id}</h1>
      <p className="text-gray-700">Details about project {params.id} will go here.</p>
    </div>
    </div>
  );
}