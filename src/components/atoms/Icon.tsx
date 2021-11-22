import React, { createElement, FC } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import GesturingNo from '../../assets/icons/gesturingNo.svg';
import Leg from '../../assets/icons/leg.svg';
import Muscle from '../../assets/icons/muscle.svg';
import Pouting from '../../assets/icons/pouting.svg';
import RaisingHand from '../../assets/icons/raisingHand.svg';
import Standing from '../../assets/icons/standing.svg';
import LeftArrow from '../../assets/icons/iconArrowleft.svg';
import Caretdown from '../../assets/icons/caretdown.svg';
import Close from '../../assets/icons/close.svg';
import Setting from '../../assets/icons/setting.svg';
import Noti from '../../assets/icons/noti.svg';
import Reset from '../../assets/icons/reset.svg';
import UnderArrow from '../../assets/icons/underArrow.svg';
import ImojiArm from '../../assets/icons/imoji_arm.svg';
import ImojiFeelgood from '../../assets/icons/imoji_feelgood.svg';
import ImojiFeeljust from '../../assets/icons/imoji_feeljust.svg';
import ImojiFeelsad from '../../assets/icons/imoji_feelsad.svg';
import ImojiFeelverysad from '../../assets/icons/imoji_feelverysad.svg';
import ImojiFever from '../../assets/icons/imoji_fever.svg';
import ImojiLeg from '../../assets/icons/imoji_leg.svg';
import ImojiLowfever from '../../assets/icons/imoji_lowfever.svg';
import ImojiMiddle from '../../assets/icons/imoji_middle.svg';
import ImojiNo from '../../assets/icons/imoji_no.svg';
import ImojiSad from '../../assets/icons/imoji_sad.svg';
import ImojiWholebody from '../../assets/icons/imoji_wholebody.svg';
import ImojiYes from '../../assets/icons/imoji_yes.svg';
import ImojiChat from '../../assets/icons/imojiChat.svg';
import Heart from '../../assets/icons/heart.svg';
import Message from '../../assets/icons/message.svg';
import Brain from '../../assets/icons/brain.svg';
import Kakao from '../../assets/icons/kakao.svg';
import Naver from '../../assets/icons/naver.svg';
import Check from '../../assets/icons/check.svg';
import UnCheck from '../../assets/icons/unCheck.svg';
import RightArrow from '../../assets/icons/rightArrow.svg';
import Search from '../../assets/icons/search.svg';
import Menu_verticle from '../../assets/icons/menu_vertical.svg';
import Fill_heart from '../../assets/icons/fill_heart.svg';
import ImojiNoLogin from '../../assets/icons/imoji_no_login.svg';
import ImojiMonkey from '../../assets/icons/imoji_monkey.svg';
import ImojiDog from '../../assets/icons/imoji_dog.svg';
import ImojiCat from '../../assets/icons/imoji_cat.svg';
import ImojiPanda from '../../assets/icons/imoji_panda.svg';
import ImojiLion from '../../assets/icons/imoji_rion.svg';
import ImojiTiger from '../../assets/icons/imoji_tiger.svg';
import ImojiKoala from '../../assets/icons/imoji_koala.svg';
import ImojiFox from '../../assets/icons/imoji_fox.svg';
import ImojiMouse from '../../assets/icons/imoji_mouse.svg';
import ImojiBaer from '../../assets/icons/imoji_bear.svg';
import WhiteClose from '../../assets/icons/whiteClose.svg';

const icons = {
  gesturingNo: GesturingNo,
  leg: Leg,
  muscle: Muscle,
  pouting: Pouting,
  raisingHand: RaisingHand,
  standing: Standing,
  leftArrow: LeftArrow,
  caretDown: Caretdown,
  close: Close,
  setting: Setting,
  notification: Noti,
  reset: Reset,
  underArrow: UnderArrow,
  imojiArm: ImojiArm,
  imojiFeelgood: ImojiFeelgood,
  imojiFeeljust: ImojiFeeljust,
  imojiFeelsad: ImojiFeelsad,
  imojiFeelverysad: ImojiFeelverysad,
  imojiFever: ImojiFever,
  imojiLeg: ImojiLeg,
  imojiLowfever: ImojiLowfever,
  imojiMiddle: ImojiMiddle,
  imojiNo: ImojiNo,
  imojiSad: ImojiSad,
  imojiWholebody: ImojiWholebody,
  imojiYes: ImojiYes,
  heart: Heart,
  message: Message,
  brain: Brain,
  kakao: Kakao,
  naver: Naver,
  check: Check,
  unCheck: UnCheck,
  rightArrow: RightArrow,
  search: Search,
  menu_verticle: Menu_verticle,
  imojiChat: ImojiChat,
  fill_heart: Fill_heart,
  imojiNoLogin: ImojiNoLogin,
  imojiMonkey: ImojiMonkey,
  imojiDog: ImojiDog,
  imojiCat: ImojiCat,
  imojiPanda: ImojiPanda,
  imojiLion: ImojiLion,
  imojiTiger: ImojiTiger,
  imojiKoala: ImojiKoala,
  imojiFox: ImojiFox,
  imojiRabbit: ImojiMouse,
  imojiBear: ImojiBaer,
  whiteClose: WhiteClose,
} as const;

export type AssetIconType = keyof typeof icons;

interface Props extends SvgProps {
  type: AssetIconType;
  btnStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const Icon: FC<Props> = ({ type, btnStyle, onPress, ...props }) =>
  onPress ? (
    <TouchableOpacity onPress={onPress} style={btnStyle}>
      {createElement(icons[type], { ...props })}
    </TouchableOpacity>
  ) : (
    createElement(icons[type], { ...props })
  );

export default Icon;
