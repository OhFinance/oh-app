import { Contract } from "@ethersproject/contracts";
import { utils } from "ethers";
import { useWeb3 } from "hooks/useWeb3";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState, useAppSelector } from "state";
import { useBlockNumber } from "state/application/hooks";
import { useBlock } from "state/block/hooks";
import { SkipFirst } from "types/tuples";
import { INVALID_RESULT } from "./constants";
import {
  INVALID_CALL_RESULT,
  isValidMethodArgs,
  parseCallKey,
  toCallKey,
  toCallState,
} from "./helpers";
import { addMulticallListeners, removeMulticallListeners } from "./state";
import {
  Call,
  CallResult,
  CallState,
  ListenerOptions,
  ListenerOptionsWithGas,
  OptionalMethodInputs,
} from "./types";
import { callKeysToCalls, callsToCallKeys } from "./utils/callKeys";

type SkipFirstTwoParams<T extends (...args: any) => any> = SkipFirst<
  Parameters<T>,
  2
>;

// the lowest level call for subscribing to contract data
function useCallsDataSubscription(
  chainId: number | undefined,
  calls: Array<Call | undefined>,
  blocksPerFetch = 1
): CallResult[] {
  const callResults = useAppSelector((state) => state.multicall.callResults);
  const dispatch = useDispatch();

  const serializedCallKeys: string = useMemo(
    () => JSON.stringify(callsToCallKeys(calls)),
    [calls]
  );

  // update listeners when there is an actual change that persists for at least 100ms
  useEffect(() => {
    const callKeys: string[] = JSON.parse(serializedCallKeys);
    const calls = callKeysToCalls(callKeys);
    if (!chainId || !calls) return;
    dispatch(
      addMulticallListeners({
        chainId,
        calls,
        options: { blocksPerFetch },
      })
    );

    return () => {
      dispatch(
        removeMulticallListeners({
          chainId,
          calls,
          options: { blocksPerFetch },
        })
      );
    };
  }, [chainId, dispatch, blocksPerFetch, serializedCallKeys]);

  return useMemo(
    () =>
      calls.map<CallResult>((call) => {
        if (!chainId || !call) return INVALID_RESULT;
        const result = callResults[chainId]?.[toCallKey(call)];
        const data =
          result?.data && result.data !== "0x" ? result.data : undefined;
        return { valid: true, data, blockNumber: result?.blockNumber };
      }),
    [callResults, calls, chainId]
  );
}

// the lowest level call for subscribing to contract data
function useCallsData(
  calls: (Call | undefined)[],
  options?: ListenerOptions
): CallResult[] {
  const { chainId } = useWeb3();
  const callResults = useSelector<
    AppState,
    AppState["multicall"]["callResults"]
  >((state) => state.multicall.callResults);
  const dispatch = useDispatch<AppDispatch>();

  const serializedCallKeys: string = useMemo(
    () =>
      JSON.stringify(
        calls
          ?.filter((c): c is Call => Boolean(c))
          ?.map(toCallKey)
          ?.sort() ?? []
      ),
    [calls]
  );

  // update listeners when there is an actual change that persists for at least 100ms
  useEffect(() => {
    const callKeys: string[] = JSON.parse(serializedCallKeys);
    if (!chainId || callKeys.length === 0) {
      return undefined;
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const calls = callKeys.map((key) => parseCallKey(key));
    dispatch(
      addMulticallListeners({
        chainId,
        calls,
        options,
      })
    );

    return () => {
      dispatch(
        removeMulticallListeners({
          chainId,
          calls,
          options,
        })
      );
    };
  }, [chainId, dispatch, options, serializedCallKeys]);

  return useMemo(
    () =>
      calls.map<CallResult>((call) => {
        if (!chainId || !call) {
          return INVALID_CALL_RESULT;
        }

        const result = callResults[chainId]?.[toCallKey(call)];
        let data;
        if (result?.data && result?.data !== "0x") {
          // eslint-disable-next-line prefer-destructuring
          data = result.data;
        }

        return { valid: true, data, blockNumber: result?.blockNumber };
      }),
    [callResults, calls, chainId]
  );
}

export const useSingleCallResult = (
  contract: Contract | null | undefined,
  methodName: string,
  inputs?: OptionalMethodInputs,
  options?: ListenerOptions
): CallState => {
  const fragment = useMemo(
    () => contract?.interface?.getFunction(methodName),
    [contract, methodName]
  );

  const calls = useMemo<Call[]>(() => {
    return contract && fragment && isValidMethodArgs(inputs)
      ? [
          {
            address: contract.address,
            callData: contract.interface.encodeFunctionData(fragment, inputs),
          },
        ]
      : [];
  }, [contract, fragment, inputs]);

  const result = useCallsData(calls, options)[0];
  const { currentBlock } = useBlock();

  return useMemo(() => {
    return toCallState(result, contract?.interface, fragment, currentBlock);
  }, [result, contract, fragment, currentBlock]);
};

export function useSingleContractMultipleData(
  ...args: SkipFirstTwoParams<typeof _useSingleContractMultipleData>
) {
  const { chainId, latestBlock } = useCallContext();
  return _useSingleContractMultipleData(chainId, latestBlock, ...args);
}

// formats many calls to a single function on a single contract, with the function name and inputs specified
export function _useSingleContractMultipleData(
  chainId: number | undefined,
  latestBlockNumber: number | undefined,
  contract: Contract | null | undefined,
  methodName: string,
  callInputs: OptionalMethodInputs[],
  options?: Partial<ListenerOptionsWithGas>
): CallState[] {
  const { gasRequired, blocksPerFetch } = options ?? {};

  // Create ethers function fragment
  const fragment = useMemo(
    () => contract?.interface?.getFunction(methodName),
    [contract, methodName]
  );

  // Get encoded call data. Note can't use useCallData below b.c. this is  for a list of CallInputs
  const callDatas = useMemo(() => {
    if (!contract || !fragment) return [];
    return callInputs.map<string | undefined>((callInput) =>
      isValidMethodArgs(callInput)
        ? contract.interface.encodeFunctionData(fragment, callInput)
        : undefined
    );
  }, [callInputs, contract, fragment]);

  // Create call objects
  const calls = useMemo(() => {
    if (!contract) return [];
    return callDatas.map<Call | undefined>((callData) => {
      if (!callData) return undefined;
      return {
        address: contract.address,
        callData,
        gasRequired,
      };
    });
  }, [contract, callDatas, gasRequired]);

  // Subscribe to call data
  const results = useCallsDataSubscription(chainId, calls, blocksPerFetch);

  return useMemo(() => {
    return results.map((result) =>
      toCallState(result, contract?.interface, fragment, latestBlockNumber)
    );
  }, [results, contract, fragment, latestBlockNumber]);
}

export function useMultipleContractSingleData(
  ...args: SkipFirstTwoParams<typeof _useMultipleContractSingleData>
) {
  const { chainId, latestBlock } = useCallContext();
  return _useMultipleContractSingleData(chainId, latestBlock, ...args);
}

export function _useMultipleContractSingleData(
  chainId: number | undefined,
  latestBlockNumber: number | undefined,
  addresses: (string | undefined)[],
  contractInterface: utils.Interface,
  methodName: string,
  callInputs?: OptionalMethodInputs,
  options?: Partial<ListenerOptionsWithGas>
): CallState[] {
  const { gasRequired, blocksPerFetch } = options ?? {};

  const { fragment, callData } = useCallData(
    methodName,
    contractInterface,
    callInputs
  );

  // Create call objects
  const calls = useMemo(() => {
    if (!callData) return [];
    return addresses.map<Call | undefined>((address) => {
      if (!address) return undefined;
      return { address, callData, gasRequired };
    });
  }, [addresses, callData, gasRequired]);

  // Subscribe to call data
  const results = useCallsDataSubscription(chainId, calls, blocksPerFetch);

  return useMemo(() => {
    return results.map((result) =>
      toCallState(result, contractInterface, fragment, latestBlockNumber)
    );
  }, [fragment, results, contractInterface, latestBlockNumber]);
}

export function useMultipleContractMultipleData(
  ...args: SkipFirstTwoParams<typeof _useMultipleContractMultipleData>
) {
  const { chainId, latestBlock } = useCallContext();
  return _useMultipleContractMultipleData(chainId, latestBlock, ...args);
}

export function _useMultipleContractMultipleData(
  chainId: number | undefined,
  latestBlockNumber: number | undefined,
  addresses: (string | undefined)[],
  contractInterface: utils.Interface,
  methodName: string,
  callInputs?: OptionalMethodInputs,
  options?: Partial<ListenerOptionsWithGas>
): CallState[] {
  const { gasRequired, blocksPerFetch } = options ?? {};

  const fragment = useMemo(
    () => contractInterface?.getFunction(methodName),
    [contractInterface, methodName]
  );

  const callDatas = useMemo(() => {
    if (!fragment) return [];
    return callInputs.map((callInput, i) => {
      return isValidMethodArgs(callInput)
        ? contractInterface?.encodeFunctionData(fragment, callInput)
        : undefined;
    });
  }, [callInputs, contractInterface, fragment]);

  const calls = useMemo(() => {
    return callDatas.map((callData, i) => {
      if (!callData || !addresses[i]) return undefined;
      return {
        address: addresses[i],
        callData,
        gasRequired,
      };
    });
  }, [callDatas, addresses, gasRequired]);

  // Subscribe to call data
  const results = useCallsDataSubscription(chainId, calls, blocksPerFetch);

  return useMemo(() => {
    return results.map((result) =>
      toCallState(result, contractInterface, fragment, latestBlockNumber)
    );
  }, [fragment, results, contractInterface, latestBlockNumber]);
}

function useCallContext() {
  const { chainId } = useWeb3();
  const latestBlock = useBlockNumber();
  return { chainId, latestBlock };
}

function useCallData(
  methodName: string,
  contractInterface: utils.Interface | null | undefined,
  callInputs: OptionalMethodInputs | undefined
) {
  // Create ethers function fragment
  const fragment = useMemo(
    () => contractInterface?.getFunction(methodName),
    [contractInterface, methodName]
  );
  // Get encoded call data
  const callData: string | undefined = useMemo(
    () =>
      fragment && isValidMethodArgs(callInputs)
        ? contractInterface?.encodeFunctionData(fragment, callInputs)
        : undefined,
    [callInputs, contractInterface, fragment]
  );
  return { fragment, callData };
}
