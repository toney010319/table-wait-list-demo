"use client";

export default function Filters({ search, setSearch, filter, setFilter }) {
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded w-full sm:w-1/2"
      />
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded w-full sm:w-1/4">
        <option value="ALL">All</option>
        <option value="WAITING">Waiting</option>
        <option value="CALLED">Called</option>
        <option value="SEATED">Seated</option>
        <option value="REMOVED">Removed</option>
      </select>
    </div>
  );
}
