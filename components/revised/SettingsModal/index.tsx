import FullScreenModal from '@components/common/modals/FullScreenModal';
import React, { CSSProperties, FC } from 'react';
import styled from '@emotion/styled';
import SettingItem, { IItem } from './SettingsItem';

export interface ISettings {
  bgColor?: string;
  show: boolean;
  onCloseModal: any;
  style: CSSProperties;
  items: IItem[];
}

export const SettingItemsList = styled.div`
  position: absolute;
  width: 180px;
  border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  > button:not(:last-of-type) {
    border-bottom: 1px solid #dfdfdf;
  }
`;

const SettingsModal: FC<ISettings> = ({ bgColor, show, onCloseModal, style, items }) => {
  return (
    <FullScreenModal show={show} onCloseModal={onCloseModal} style={{ backgroundColor: bgColor }}>
      <SettingItemsList style={style} onClick={onCloseModal}>
        {items.map((item, i) => (
          <SettingItem
            key={i}
            content={{ icon: item.content.icon, title: item.content.title, rest: item.content.rest }}
            onClick={item.onClick}
          />
        ))}
      </SettingItemsList>
    </FullScreenModal>
  );
};

export default SettingsModal;
