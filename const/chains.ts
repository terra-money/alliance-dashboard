import { Chain } from "../models/Chain";

export const DEFAULT_CHAIN: string = "phoenix-1";

export const SUPPORTED_CHAINS: { [key: string]: Chain } = {
  "carbon-1": Chain.fromAny({
    id: "carbon-1",
    bondDenom: "swth",
    name: "Carbon",
    decimals: 8,
    icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/chains/Carbon.svg",
    allianceCoins: {
      "ibc/62A3870B9804FC3A92EAAA1F0F3F07E089DBF76CC521466CA33F5AAA8AD42290": {
        name: "ampLuna",
        priceKey: "terra1ecgazyd0waaj3g7l9cmy5gulhxkps2gmxu9ghducvuypjq68mq2s5lvsct",
        icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/ampLuna.svg",
        color: "#324ab2",
      },
      "ibc/FBEE20115530F474F8BBE1460DA85437C3FBBFAF4A5DEBD71CA6B9C40559A161": {
        name: "stLuna",
        priceKey: "ibc/08095CEDEA29977C9DD0CE9A48329FDA622C183359D5F90CF04CC4FF80CBE431",
        icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/stLUNA.svg",
        color: "#fb0174",
      },
    },
  }),
  "migaloo-1": Chain.fromAny({
    id: "migaloo-1",
    bondDenom: "uwhale",
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
        color: "#324ab2",
      },
      "ibc/40C29143BF4153B365089E40E437B7AA819672646C45BB0A5F1E10915A0B6708": {
        name: "bLuna",
        priceKey: "terra17aj4ty4sz4yhgm08na8drc0v03v2jwr3waxcqrwhajj729zhl7zqnpc0ml",
        icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/bLuna.png",
        color: "#ff7500",
      },
      "factory/migaloo1xv4ql6t6r8zawlqn2tyxqsrvjpmjfm6kvdfvytaueqe3qvcwyr7shtx0hj/uLP": {
        name: "USDC-WHALE-LP",
        priceKey: "factory/migaloo1xv4ql6t6r8zawlqn2tyxqsrvjpmjfm6kvdfvytaueqe3qvcwyr7shtx0hj/uLP",
        icon: [
          "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/USDC.svg",
          "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/Whale.svg",
        ],
        color: "#3b74c5"
      },
      "factory/migaloo1erul6xyq0gk6ws98ncj7lnq9l4jn4gnnu9we73gdz78yyl2lr7qqrvcgup/ash": {
        name: "ASH",
        priceKey: "factory/migaloo1erul6xyq0gk6ws98ncj7lnq9l4jn4gnnu9we73gdz78yyl2lr7qqrvcgup/ash",
        icon: "images/ash.svg",
        color: "#3CCD64"
      },
      "migaloo10nucfm2zqgzqmy7y7ls398t58pjt9cwjsvpy88y2nvamtl34rgmqt5em2v": {
        name: "mUSDC",
        priceKey: "migaloo10nucfm2zqgzqmy7y7ls398t58pjt9cwjsvpy88y2nvamtl34rgmqt5em2v",
        icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/USDC.svg",
        color: "#3b74c5"
      },
    },
  }),
  "phoenix-1": Chain.fromAny({
    id: "phoenix-1",
    bondDenom: "uluna",
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
        priceKey: "ibc/0E90026619DD296AD4EF9546396F292B465BAB6B5BE00ABD6162AA1CE8E68098",
        icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/rSWTH.svg",
        color: "#324ab2",
      },
      "ibc/B3F639855EE7478750CC8F82072307ED6E131A8EFF20345E1D136B50C4E5EC36": {
        name: "ampWhale",
        priceKey: "ibc/B3F639855EE7478750CC8F82072307ED6E131A8EFF20345E1D136B50C4E5EC36",
        icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/ampWHALE.svg",
        color: "#324ab2",
      },
      "ibc/517E13F14A1245D4DE8CF467ADD4DA0058974CDCC880FA6AE536DBCA1D16D84E": {
        name: "bWhale",
        priceKey: "ibc/517E13F14A1245D4DE8CF467ADD4DA0058974CDCC880FA6AE536DBCA1D16D84E",
        icon: "https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/bWHALE.png",
        color: "#fb0174",
      },
    },
  }),
};
