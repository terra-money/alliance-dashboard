import { Chain } from "../models/Chain";

export const DEFAULT_CHAIN: string = "phoenix-1";

export const SUPPORTED_CHAINS: { [key: string]: Chain } = {
  "carbon-1": Chain.fromAny({
    id: "carbon-1",
    bondDenom: "swth",
    bondDenomPriceKey: "SWTH",
    name: "Carbon",
    decimals: 8,
    icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/chains/Carbon.svg",
    allianceCoins: {
      "ibc/62A3870B9804FC3A92EAAA1F0F3F07E089DBF76CC521466CA33F5AAA8AD42290": {
        name: "ampLuna",
        priceKey: "terra1ecgazyd0waaj3g7l9cmy5gulhxkps2gmxu9ghducvuypjq68mq2s5lvsct",
        icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/ampLuna.svg",
      },
      "ibc/FBEE20115530F474F8BBE1460DA85437C3FBBFAF4A5DEBD71CA6B9C40559A161": {
        name: "stLuna",
        priceKey: "ibc/08095CEDEA29977C9DD0CE9A48329FDA622C183359D5F90CF04CC4FF80CBE431",
        icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/stLUNA.svg",
      },
    },
  }),
  "migaloo-1": Chain.fromAny({
    id: "migaloo-1",
    bondDenom: "uwhale",
    bondDenomPriceKey: "WHALE",
    name: "Migaloo",
    decimals: 6,
    allianceHub: {
      contractAddress: "migaloo190qz7q5fu4079svf890h4h3f8u46ty6cxnlt78eh486k9qm995hquuv9kd",
      denom: "factory/migaloo190qz7q5fu4079svf890h4h3f8u46ty6cxnlt78eh486k9qm995hquuv9kd/ualliance"
    },
    icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/chains/Migaloo.svg",
    allianceCoins: {
      "ibc/05238E98A143496C8AF2B6067BABC84503909ECE9E45FBCBAC2CBA5C889FD82A": {
        name: "ampLuna",
        priceKey: "terra1ecgazyd0waaj3g7l9cmy5gulhxkps2gmxu9ghducvuypjq68mq2s5lvsct",
        icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/ampLuna.svg",
      },
      "ibc/40C29143BF4153B365089E40E437B7AA819672646C45BB0A5F1E10915A0B6708": {
        name: "bLuna",
        priceKey: "terra17aj4ty4sz4yhgm08na8drc0v03v2jwr3waxcqrwhajj729zhl7zqnpc0ml",
        icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/bLuna.png",
      },
      "factory/migaloo1axtz4y7jyvdkkrflknv9dcut94xr5k8m6wete4rdrw4fuptk896su44x2z/uLP": {
        name: "WHALE/wBTC",
        lpInfo: {
          contractAddr: "migaloo1axtz4y7jyvdkkrflknv9dcut94xr5k8m6wete4rdrw4fuptk896su44x2z",
          tokensPriceKey: ["WHALE", "WBTC"],
          tokensDecimals: [6, 8],
        },
        icon: [
          "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/Whale.svg",
          "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/wbtc.svg",
        ],
      },
      "factory/migaloo1xv4ql6t6r8zawlqn2tyxqsrvjpmjfm6kvdfvytaueqe3qvcwyr7shtx0hj/uLP": {
        name: "WHALE/USDC",
        lpInfo: {
          contractAddr: "migaloo1xv4ql6t6r8zawlqn2tyxqsrvjpmjfm6kvdfvytaueqe3qvcwyr7shtx0hj",
          tokensPriceKey: ["WHALE","USDC"],
          tokensDecimals: [6, 6]
        },
        icon: [
          "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/Whale.svg",
          "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/USDC.svg",
        ],
      },
      "factory/migaloo1erul6xyq0gk6ws98ncj7lnq9l4jn4gnnu9we73gdz78yyl2lr7qqrvcgup/ash": {
        name: "ASH",
        priceKey: "ASH",
        icon: "images/ash.svg",
      },
      "migaloo10nucfm2zqgzqmy7y7ls398t58pjt9cwjsvpy88y2nvamtl34rgmqt5em2v": {
        name: "mUSDC",
        priceKey: "USDC",
        icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/USDC.svg",
      },
    },
  }),
  "phoenix-1": Chain.fromAny({
    id: "phoenix-1",
    bondDenom: "uluna",
    bondDenomPriceKey: "LUNA",
    name: "Terra",
    decimals: 6,
    allianceHub: {
      contractAddress: "terra1jwyzzsaag4t0evnuukc35ysyrx9arzdde2kg9cld28alhjurtthq0prs2s",
      denom: "factory/terra1jwyzzsaag4t0evnuukc35ysyrx9arzdde2kg9cld28alhjurtthq0prs2s/ualliance"
    },
    icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/chains/Terra.svg",
    allianceCoins: {
      "ibc/0E90026619DD296AD4EF9546396F292B465BAB6B5BE00ABD6162AA1CE8E68098": {
        name: "rSWTH",
        priceKey: "rSWTH",
        icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/rSWTH.svg",
      },
      "ibc/B3F639855EE7478750CC8F82072307ED6E131A8EFF20345E1D136B50C4E5EC36": {
        name: "ampWhale",
        priceKey: "ibc/B3F639855EE7478750CC8F82072307ED6E131A8EFF20345E1D136B50C4E5EC36",
        icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/ampWHALE.svg",
      },
      "ibc/517E13F14A1245D4DE8CF467ADD4DA0058974CDCC880FA6AE536DBCA1D16D84E": {
        name: "bWhale",
        priceKey: "ibc/517E13F14A1245D4DE8CF467ADD4DA0058974CDCC880FA6AE536DBCA1D16D84E",
        icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/bWHALE.png",
      },
    },
  }),
};


export interface CarbonInflationRes {
  numberOfWeeks: string;
  inflationRate: string;
  last7DaysInflationRate: string;
  last14DaysInflationRate: string;
}