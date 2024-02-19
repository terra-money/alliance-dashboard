
export const headers = [
  {
    title: "Symbol",
  },
  {
    title: "Total Staked",
  },
  {
    title: "Total Value Staked",
  },
  {
    title: "Take Rate",
    tooltip: () => "A tax that redistributes a percentage of the Alliance asset to all stakers on this chain.",
  },
  {
    title: "Reward Weight",
    tooltip: (chainId?: string) => (
      <>
        <p>The proportion of total staking rewards on this chain to be directed to stakers of this asset.</p>
        {chainId == "phoenix-1" && (
          <p>
            On Terra, based on the{" "}
            <a target="_blank" style={{ textDecoration: "underline" }} href="https://agora.terra.money/discussion/12477-alliance-followon-proposal">
              Alliance Signalling Governance proposal
            </a>
            , rewards are uniformly distributed to each LST for a given chain, regardless of LST staked.
          </p>
        )}
      </>
    ),
  },
  {
    title: "Additional APY",
    tooltip: () => "A second annualized yield in the form of the chain's native token.",
  },
];
