import { CiStar } from "react-icons/ci";
import { Watchlist } from '../components/Watchlist';

export function WatchlistPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <CiStar className="h-6 w-6 text-primary-600" />
        <h1 className="text-2xl font-bold">Watchlist</h1>
      </div>
      <Watchlist />
    </div>
  );
}