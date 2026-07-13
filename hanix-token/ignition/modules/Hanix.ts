import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("HanixModule", (m) => {
  const owner = m.getAccount(0);

  const hanix = m.contract("HanixToken", [owner]);

  return { hanix };
});
