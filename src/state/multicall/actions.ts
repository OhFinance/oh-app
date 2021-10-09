import { Call, ListenerOptions } from "./types";

export interface AddMulticallListeners {
  calls: Call[];
  chainId: number;
  options?: ListenerOptions;
}

export interface RemoveMulticallListeners {
  calls: Call[];
  chainId: number;
  options?: ListenerOptions;
}
