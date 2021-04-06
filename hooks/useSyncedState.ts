import { useState } from "react";

export default function useSyncedState<T>(initial: T) {
   const [state, setState] = useState<T>(initial)
}
