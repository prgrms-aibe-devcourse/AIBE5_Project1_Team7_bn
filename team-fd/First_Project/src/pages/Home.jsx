import { useState } from "react";
import { towns } from "../features/towns/data/town";
import { TownCard } from "../features/towns/components/TownCard";
import { TownDetailModal } from "../features/towns/components/TownDetailModal";

export default function Home() {
  const [selectedTown, setSelectedTown] = useState(null);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {towns.map((town) => (
          <TownCard
            key={town.id}
            town={town}
            onClick={() => setSelectedTown(town)}
          />
        ))}
      </section>

      {selectedTown && (
        <TownDetailModal
          town={selectedTown}
          onClose={() => setSelectedTown(null)}
        />
      )}
    </main>
  );
}
