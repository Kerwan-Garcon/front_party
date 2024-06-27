import { Event } from "./interfaces/events.interfaces";
import { Beer } from "lucide-react";
import { Game } from "./interfaces/events.interfaces";

export const TYPE_PARTY = (event?: Event) => {
  const obj = {
    PARTY: {
      icon: "🎉",
      section: (
        <div className="flex flex-col gap-2">
          {event?.bringDrinks && (
            <>
              <h2 className="text-base flex gap-2">
                <Beer className="text-primary" /> If possible bring drinks with
                you
              </h2>
            </>
          )}
        </div>
      ),
      item: null,
      image: "/images/party.jpg",
    },
    VIDEO_GAME: {
      icon: "🎮",
      section: (
        <div className="flex flex-col gap-2">
          {event?.bringEquipment && (
            <>
              <h2 className="text-2xl">You should bring your equipment</h2>
              <p>{event?.equipmentDetails}</p>
            </>
          )}
          {event?.bringDrinks && (
            <>
              <h2 className="text-base flex gap-2">
                <Beer /> If possible bring drinks with you
              </h2>
            </>
          )}
        </div>
      ),
      item: (
        <>
          <h2 className="text-lg underline">Playble games</h2>
          <ul>
            {event?.games.map((game: Game) => (
              <li key={game.id}>{game.name}</li>
            ))}
          </ul>
        </>
      ),
      image: "/images/games.png",
    },
    BOARD_GAME: {
      icon: "🎲",
      section: (
        <div className="flex flex-col gap-2">
          {event?.bringDrinks && (
            <>
              <h2 className="text-base flex gap-2">
                <Beer /> If possible bring drinks with you
              </h2>
            </>
          )}
        </div>
      ),
      item: (
        <>
          <h2 className="text-lg underline">Playable games</h2>
          <ul>
            {event?.games.map((game: Game) => (
              <li key={game.id}>{game.name}</li>
            ))}
          </ul>
        </>
      ),
      image: "/images/board.png",
    },
  };

  return obj[event?.type || "PARTY"];
};
