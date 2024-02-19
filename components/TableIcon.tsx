import { Chain } from "../models/Chain"
import { AllianceAsset } from "@terra-money/feather.js/dist/client/lcd/api/AllianceAPI"
import { Tooltip } from "@nextui-org/react";
import styles from '../styles/TableIcon.module.css';

interface TableIconProps {
    row: AllianceAsset;
    chain: Chain;
}

export const TableIcon = (props: TableIconProps) => {
    const alliance = props.chain.allianceCoins[props.row.denom];

    return (
        <span className={styles.IconWrapper}>
            <Tooltip content={props.chain.name} >
                {typeof alliance?.icon === "string" && <img src={alliance.icon} className={styles.SingleIcon} alt="Coin image" />}
                {Array.isArray(alliance?.icon) && <div className={styles.ManyIcons}>
                    <img src={alliance.icon[0]} alt="Coin image" />
                    <img src={alliance.icon[1]} alt="Coin image" />
                </div>}
            </Tooltip>
        </span>
    )
}