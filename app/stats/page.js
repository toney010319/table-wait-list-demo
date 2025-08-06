import { getStats } from "../lib/data";

export default async function StatsPage() {
  const stats = await getStats();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Today’s Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white border rounded">
          <p className="font-medium">Total Added</p>
          <p>{stats.totalAdded}</p>
        </div>
        <div className="p-4 bg-white border rounded">
          <p className="font-medium">Total Seated</p>
          <p>{stats.totalSeated}</p>
        </div>
        <div className="p-4 bg-white border rounded">
          <p className="font-medium">Total Removed</p>
          <p>{stats.totalRemoved}</p>
        </div>
        <div className="p-4 bg-white border rounded">
          <p className="font-medium">Average Wait</p>
          <p>{stats.averageWait} min</p>
        </div>
        <div className="p-4 bg-white border rounded">
          <p className="font-medium"> Removed</p>
          <p>{stats.percentRemoved}%</p>
        </div>
        <div className="p-4 bg-white border rounded">
          <p className="font-medium">By Party Size</p>
          <p>1-2 person: {stats.byPartySize.small}</p>
          <p>3-4 person: {stats.byPartySize.medium}</p>
          <p>5+ person: {stats.byPartySize.large}</p>
        </div>
      </div>
    </div>
  );
}
