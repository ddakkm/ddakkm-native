import { AssetIconType } from './../components/atoms/Icon';

export const convertToCharactorSrc = (value?: string): AssetIconType => {
  switch (value) {
    case 'koala':
      return 'imojiKoala';
    case 'panda':
      return 'imojiPanda';
    case 'lion':
      return 'imojiLion';
    case 'tiger':
      return 'imojiTiger';
    case 'fox':
      return 'imojiFox';
    case 'rabbit':
      return 'imojiRabbit';
    case 'bear':
      return 'imojiBear';
    case 'dog':
      return 'imojiDog';
    case 'cat':
      return 'imojiCat';
    case 'monkey':
      return 'imojiMonkey';
    default:
      return 'imojiNoLogin';
  }
};
