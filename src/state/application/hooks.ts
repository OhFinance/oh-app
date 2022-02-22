import { useWeb3 } from "hooks/useWeb3";
import { useAppSelector } from "state";

export function useBlockNumber(): number | undefined {
  const { chainId } = useWeb3();

  return useAppSelector(
    (state) => state.application.blockNumber[chainId ?? -1]
  );
}
