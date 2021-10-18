import React, { createElement, FC } from 'react';
import { TouchableOpacity } from 'react-native';
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
} as const;

export type AssetIconType = keyof typeof icons;

interface Props extends SvgProps {
  type: AssetIconType;
  onPress?: () => void;
}

const Icon: FC<Props> = ({ type, onPress, ...props }) =>
  onPress ? (
    <TouchableOpacity onPress={onPress}>
      {createElement(icons[type], { ...props })}
    </TouchableOpacity>
  ) : (
    createElement(icons[type], { ...props })
  );

export default Icon;
