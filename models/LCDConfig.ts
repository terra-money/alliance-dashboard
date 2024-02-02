import { LCDClient } from "@terra-money/feather.js";

export const LCD_CONFIG = {
    "phoenix-1": {
        chainID: "phoenix-1",
        lcd: "https://phoenix-lcd.terra.dev",
        gasAdjustment: 1.75,
        gasPrices: { uluna: 0.015 },
        prefix: "terra",
    },
    "migaloo-1": {
        chainID: "migaloo-1",
        lcd: "https://lcd-migaloo.tfl.foundation",
        gasAdjustment: 1.75,
        gasPrices: { uluna: 0.015 },
        prefix: "migaloo",
    },
    "carbon-1": {
        chainID: "carbon-1",
        lcd: "https://lcd-carbon.tfl.foundation",
        gasAdjustment: 1.75,
        gasPrices: { swth: 1000 },
        prefix: "swth",
    },
}
export const LCD = new LCDClient(LCD_CONFIG);