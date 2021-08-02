// Copyright 2019-2020 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import * as React from 'react';
import classNames from 'classnames';

import { Avatar, Props as AvatarProps } from './Avatar';
import { useRestoreFocus } from '../util/hooks/useRestoreFocus';

import { LocalizerType } from '../types/Util';

export type Props = {
  readonly i18n: LocalizerType;

  onEditProfile: () => unknown;
  onSetChatColor: () => unknown;
  onViewPreferences: () => unknown;
  onViewArchive: () => unknown;

  // Matches Popper's RefHandler type
  innerRef?: React.Ref<HTMLDivElement>;
  style: React.CSSProperties;
} & AvatarProps;

export const AvatarPopup = (props: Props): JSX.Element => {
  const {
    i18n,
    name,
    profileName,
    phoneNumber,
    title,
    onEditProfile,
    onSetChatColor,
    onViewPreferences,
    onViewArchive,
    style,
  } = props;

  const shouldShowNumber = Boolean(name || profileName);

  // Note: mechanisms to dismiss this view are all in its host, MainHeader

  // Focus first button after initial render, restore focus on teardown
  const [focusRef] = useRestoreFocus();

  return (
    <div style={style} className="module-avatar-popup">
      <button
        className="module-avatar-popup__profile"
        onClick={onEditProfile}
        ref={focusRef}
        type="button"
      >
        <Avatar {...props} size={52} />
        <div className="module-avatar-popup__profile__text">
          <div className="module-avatar-popup__profile__name">
            {profileName || title}
          </div>
          {shouldShowNumber ? (
            <div className="module-avatar-popup__profile__number">
              {phoneNumber}
            </div>
          ) : null}
        </div>
      </button>
      <hr className="module-avatar-popup__divider" />
      <button
        type="button"
        className="module-avatar-popup__item"
        onClick={onViewPreferences}
      >
        <div
          className={classNames(
            'module-avatar-popup__item__icon',
            'module-avatar-popup__item__icon-settings'
          )}
        />
        <div className="module-avatar-popup__item__text">
          {i18n('mainMenuSettings')}
        </div>
      </button>
      <button
        type="button"
        className="module-avatar-popup__item"
        onClick={onSetChatColor}
      >
        <div
          className={classNames(
            'module-avatar-popup__item__icon',
            'module-avatar-popup__item__icon-colors'
          )}
        />
        <div className="module-avatar-popup__item__text">
          {i18n('avatarMenuChatColors')}
        </div>
      </button>
      <button
        type="button"
        className="module-avatar-popup__item"
        onClick={onViewArchive}
      >
        <div
          className={classNames(
            'module-avatar-popup__item__icon',
            'module-avatar-popup__item__icon-archive'
          )}
        />
        <div className="module-avatar-popup__item__text">
          {i18n('avatarMenuViewArchive')}
        </div>
      </button>
    </div>
  );
};
