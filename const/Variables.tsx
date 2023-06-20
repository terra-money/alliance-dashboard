import { Pill } from "@/types/ResponseTypes";

export const pills: Pill[] = [
  {
    id: 4,
    symbol: 'https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/Luna.svg',
    token: 'uluna'
  },
  {
    id: 1,
    symbol: 'https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/Kuji.svg',
    token: 'ibc/BB6BCDB515050BAE97516111873CCD7BCF1FD0CCB723CC12F3C4F704D6C646CE'
  },
  {
    id: 2,
    symbol: 'https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/Carbon.svg',
    token: 'ibc/8FEFAE6AECF6E2A255585617F781F35A8D5709A545A804482A261C0C9548A9D3'
  },
  {
    id: 3,
    symbol: 'https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/Whale.svg',
    token: 'ibc/EDD6F0D66BCD49C1084FB2C35353B4ACD7B9191117CE63671B61320548F7C89D'
  },
]

export const supportedTokens: any = {
  bLuna: 'terra17aj4ty4sz4yhgm08na8drc0v03v2jwr3waxcqrwhajj729zhl7zqnpc0ml',
  ampLuna: 'terra1ecgazyd0waaj3g7l9cmy5gulhxkps2gmxu9ghducvuypjq68mq2s5lvsct',
  stLuna: 'ibc/08095CEDEA29977C9DD0CE9A48329FDA622C183359D5F90CF04CC4FF80CBE431',
  swth: 'ibc/8FEFAE6AECF6E2A255585617F781F35A8D5709A545A804482A261C0C9548A9D3',
  uwhale: 'ibc/EDD6F0D66BCD49C1084FB2C35353B4ACD7B9191117CE63671B61320548F7C89D',
  kuji: 'ibc/BB6BCDB515050BAE97516111873CCD7BCF1FD0CCB723CC12F3C4F704D6C646CE',
  uluna: 'ibc/C491E7582E94AE921F6A029790083CDE1106C28F3F6C4AD7F1340544C13EC372'
}

export const supportedChains: any = {
  carbon: {
    name: 'Carbon',
    lcd: 'https://query-api.carbon.network',
    inflation: 0.04,
    denom: 'swth',
    icon: 'https://raw.githubusercontent.com/terra-money/station-assets/main/img/chains/Carbon.svg',
    'ibc/62A3870B9804FC3A92EAAA1F0F3F07E089DBF76CC521466CA33F5AAA8AD42290': {
      name: 'ampLuna',
      icon: 'https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/ampLuna.svg',
      color: '#324ab2'
    },
    'ibc/FBEE20115530F474F8BBE1460DA85437C3FBBFAF4A5DEBD71CA6B9C40559A161': {
      name: 'stLuna',
      icon: 'https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/stLUNA.svg',
      color: '#fb0174'
    }
  },
  kujira: {
    name: 'Kujira',
    lcd: 'https://kujira-api.polkachu.com',
    denom: 'kuji',
    inflation: 0,
    icon: 'https://raw.githubusercontent.com/terra-money/station-assets/main/img/chains/Kujira.png'
  },
  migaloo: {
    name: 'Migaloo',
    lcd: 'https://ww-migaloo-rest.polkachu.com',
    inflation: 0.08,
    denom: 'uwhale',
    icon: 'https://raw.githubusercontent.com/terra-money/station-assets/main/img/chains/Migaloo.svg',
    'ibc/05238E98A143496C8AF2B6067BABC84503909ECE9E45FBCBAC2CBA5C889FD82A': {
      name: 'ampLuna',
      icon: 'https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/ampLuna.svg',
      color: '#324ab2'
    },
    'ibc/40C29143BF4153B365089E40E437B7AA819672646C45BB0A5F1E10915A0B6708': {
      name: 'bLuna',
      icon: 'https://raw.githubusercontent.com/terra-money/station-assets/main/img/coins/bLuna.svg',
      color: '#ff7500'
    }
  },
  terra: {
    name: 'Terra',
    lcd: 'https://phoenix-lcd.terra.dev',
    inflation: 0.07,
    denom: 'uluna',
    icon: 'https://raw.githubusercontent.com/terra-money/station-assets/main/img/chains/Terra.svg'
  }
};