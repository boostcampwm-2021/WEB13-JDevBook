import styled from 'styled-components';

import { ClickableProfilePhoto } from 'components/common';
import style from 'theme/style';

const AlarmBox = styled.div`
  display: flex;
  padding: ${style.padding.normal};
  color: ${(props) => props.theme.black};
  :hover {
    background-color: ${(props) => props.theme.lightgray};
    border-radius: 10px;
  }
`;

const AlarmText = styled.div`
  margin-top: ${style.margin.small};
  margin-left: ${style.margin.small};
  word-break: break-word;
  font-size: 14px;
`;

const AlarmTextPreview = styled.div`
  width: 248px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  opacity: 0.4;
`;

const AlarmListView = ({ alarmList }: { alarmList: string[] }) => {
  const alarmListView = alarmList
    .map((alarm, idx) => (
      <AlarmBox key={idx}>
        <ClickableProfilePhoto userName={alarm.split(':')[0]} size={'60px'} />
        <AlarmText>
          {alarm.split(':')[1] === 'post'
            ? `${alarm.split(':')[0]} 님이 내 게시물에 댓글을 달았습니다. `
            : `${alarm.split(':')[0]} 님으로부터 메시지가 도착했습니다. `}
          <AlarmTextPreview>{alarm.split(':')[2]}</AlarmTextPreview>
        </AlarmText>
      </AlarmBox>
    ))
    .reverse();

  return <>{alarmListView}</>;
};

export default AlarmListView;
