import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ListeningContext = createContext(null);

/**
 * Lets any component ("play" buttons in the song table, hero CTA) ask the
 * listening room to load and play a track, without prop-drilling.
 */
export function ListeningProvider({ children }) {
  const [request, setRequest] = useState(null);

  const playTrack = useCallback((trackId) => {
    setRequest({ id: trackId, token: Date.now() });
  }, []);

  const value = useMemo(() => ({ request, playTrack }), [request, playTrack]);

  return <ListeningContext.Provider value={value}>{children}</ListeningContext.Provider>;
}

export function useListening() {
  const context = useContext(ListeningContext);
  if (!context) throw new Error("useListening must be used inside <ListeningProvider>");
  return context;
}
