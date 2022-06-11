import React from "react";
import { FaHome, FaHotjar, FaStar } from "react-icons/fa";
import { MdTheaterComedy, MdScience } from "react-icons/md";
import {
  GiNinjaHeroicStance,
  GiRomanToga,
  GiGhost,
  GiBandageRoll,
  GiShamblingZombie,
  GiCrimeSceneTape,
} from "react-icons/gi";
import { SiWebtoon } from "react-icons/si";
import styled from "styled-components";
import MenuItem from "../menuitem/MenuItem";

export default function Menu() {
  return (
    <MenuPane>
      <MenuItem name="Thịnh hành" Icon={FaHotjar} to="THỊNH HÀNH" />
      <MenuItem name="Siêu anh hùng" Icon={FaStar} to="SIÊU ANH HÙNG" />
      <MenuItem
        name="Hành động"
        Icon={GiNinjaHeroicStance}
        to="PHIM HÀNH ĐỘNG"
      />
      <MenuItem name="Đề cử" Icon={FaHome} to="PHIM ĐỀ CỬ" />
      <MenuItem name="Hài kịch" Icon={MdTheaterComedy} to="HÀI KỊCH" />
      <MenuItem name="Tình cảm" Icon={GiRomanToga} to="TÌNH CẢM LÃNG MẠN" />
      <MenuItem
        name="Khoa học viễn tưởng"
        Icon={MdScience}
        to="PHIM KHOA HỌC VIỄN TƯỞNG"
      />
      <MenuItem name="Kinh dị" Icon={GiGhost} to="PHIM KINH DỊ" />
      <MenuItem name="Xác sống" Icon={GiShamblingZombie} to="PHIM XÁC SỐNG" />
      <MenuItem name="Hoạt hình" Icon={SiWebtoon} to="HOẠT HÌNH ĐẶC SẮC" />
      <MenuItem name="Phiêu lưu" Icon={GiBandageRoll} to="PHIM LƯU MẠO HIỂM" />
      <MenuItem
        name="Tội phạm"
        Icon={GiCrimeSceneTape}
        to="PHIM TỘI PHẠM HÌNH SỰ"
      />
    </MenuPane>
  );
}

const MenuPane = styled.div`
  position: fixed;
  left: 0;
  top: 20%;
  width: 40px;
  padding: 4px 0;
  background: rgba(220, 220, 220, 0.3);
  z-index: 100;
  display: flex;
  flex-direction: column;
  transform-origin: left center;
  transition: all 0.3s linear;
  overflow: hidden;
  &:hover {
    width: 220px;
    background: rgba(0, 0, 0, 0.6);
  }
  .subMenu {
    display: flex;
    align-items: center;
    width: max-content;

    padding: 8px 6px;
    cursor: pointer;

    .icon {
      font-size: 30px;
      margin-right: 8px;
    }
    span {
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      &:hover {
        color: fff;
      }
    }
  }
`;
