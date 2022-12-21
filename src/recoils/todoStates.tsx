import {atom, useSetRecoilState} from 'recoil';

export const todoModalState = atom({
  key: 'todoModal',
  default: false,
});
