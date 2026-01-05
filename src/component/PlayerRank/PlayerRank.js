import React from "react";
import IronLogo from "../../Images/iron.webp";
import BronzeLogo from "../../Images/bronze.webp";
import SilverLogo from "../../Images/silver.webp";
import GoldLogo from "../../Images/gold.webp";
import PlatinumLogo from "../../Images/platinum.webp";
import DiamondLogo from "../../Images/diamond.webp";
import MythrilLogo from "../../Images/mythril.webp";
import TitanLogo from "../../Images/titan.webp";
import ImmortalLogo from "../../Images/immortal.png";
import "./PlayersRank.css";

const PlayerRank = ({ mmr, rank }) => {
  let image, rankName, division, lp;

  const toRoman = (num) => {
    const roman = ["IV", "III", "II", "I"];
    return roman[4 - num];
  };

  if (mmr < 1000) {
    image = IronLogo;
    rankName = "IRON";
    division = toRoman(Math.ceil((1000 - mmr) / 250));
    lp = mmr - (1000 - Math.ceil((1000 - mmr) / 250) * 250);
  } else if (mmr < 2000) {
    image = BronzeLogo;
    rankName = "BRONZE";
    division = toRoman(Math.ceil((2000 - mmr) / 250));
    lp = mmr - (2000 - Math.ceil((2000 - mmr) / 250) * 250);
  } else if (mmr < 3000) {
    image = SilverLogo;
    rankName = "SILVER";
    division = toRoman(Math.ceil((3000 - mmr) / 250));
    lp = mmr - (3000 - Math.ceil((3000 - mmr) / 250) * 250);
  } else if (mmr < 4000) {
    image = GoldLogo;
    rankName = "GOLD";
    division = toRoman(Math.ceil((4000 - mmr) / 250));
    lp = mmr - (4000 - Math.ceil((4000 - mmr) / 250) * 250);
  } else if (mmr < 5000) {
    image = PlatinumLogo;
    rankName = "PLATINUM";
    division = toRoman(Math.ceil((5000 - mmr) / 250));
    lp = mmr - (5000 - Math.ceil((5000 - mmr) / 250) * 250);
  } else if (mmr < 6000) {
    image = DiamondLogo;
    rankName = "DIAMOND";
    division = toRoman(Math.ceil((6000 - mmr) / 250));
    lp = mmr - (6000 - Math.ceil((6000 - mmr) / 250) * 250);
  } else if (mmr >= 6000 && rank > 700) {
    image = MythrilLogo;
    rankName = "MYTHRIL";
    division = "";
    lp = mmr - 6000;
  } else if (mmr >= 6000 && rank <= 700 && rank >= 201) {
    image = TitanLogo;
    rankName = "TITAN";
    division = "";
    lp = mmr - 6000;
  } else if (mmr >= 6000 && rank <= 200) {
    image = ImmortalLogo;
    rankName = "IMMORTAL";
    division = "";
    lp = mmr - 6000;
  }

  return (
    <div className="playerRank-grid">
      <div className="imageContainer">
        <img src={image} alt={rankName} className="logoStyle" />
      </div>
      <div className="textContainer">
        <span>
          {rankName} {division}
        </span>
        <span>{lp} RP</span>
      </div>
    </div>
  );
};

export default PlayerRank;
