import contracts from "config/constants/contracts";
import { useAddress } from "hooks/useAddress";
import { useManagerContract } from "hooks/useContract";

const Manage = () => {
  const managerAddress = useAddress(contracts.manager);
  const managerContract = useManagerContract(managerAddress);

  return <></>;
};

export default Manage;
